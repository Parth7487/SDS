#!/usr/bin/env python3
"""
Duplicate Image Finder

This script finds duplicate images in a directory using multiple methods:
1. File hash comparison (exact duplicates)
2. Perceptual hash comparison (similar images)
3. Image similarity using structural similarity

Usage:
    python duplicate_image_finder.py [directory_path]
    
If no directory is specified, it will search the current directory.
"""

import os
import sys
import hashlib
import argparse
from pathlib import Path
from collections import defaultdict
from PIL import Image, ImageHash
import numpy as np
from skimage import io, transform
from skimage.metrics import structural_similarity
import json

# Common image extensions
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.tiff', '.tif', '.svg'}

class DuplicateImageFinder:
    def __init__(self, directory, similarity_threshold=0.9):
        self.directory = Path(directory)
        self.similarity_threshold = similarity_threshold
        self.file_hashes = defaultdict(list)
        self.perceptual_hashes = defaultdict(list)
        self.images_data = {}
        
    def is_image_file(self, file_path):
        """Check if file is an image based on extension."""
        return file_path.suffix.lower() in IMAGE_EXTENSIONS
    
    def calculate_file_hash(self, file_path):
        """Calculate MD5 hash of file content."""
        try:
            with open(file_path, 'rb') as f:
                file_hash = hashlib.md5(f.read()).hexdigest()
            return file_hash
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
            return None
    
    def calculate_perceptual_hash(self, file_path):
        """Calculate perceptual hash using PIL and imagehash."""
        try:
            with Image.open(file_path) as img:
                # Convert to RGB if necessary
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # Calculate different types of perceptual hashes
                avg_hash = str(ImageHash.average_hash(img))
                dhash = str(ImageHash.dhash(img))
                phash = str(ImageHash.phash(img))
                whash = str(ImageHash.whash(img))
                
                return {
                    'average': avg_hash,
                    'dhash': dhash,
                    'phash': phash,
                    'whash': whash
                }
        except Exception as e:
            print(f"Error processing image {file_path}: {e}")
            return None
    
    def load_image_for_comparison(self, file_path):
        """Load and normalize image for structural similarity comparison."""
        try:
            # Load image and convert to grayscale
            img = io.imread(file_path, as_gray=True)
            # Resize to standard size for comparison
            img_resized = transform.resize(img, (256, 256), anti_aliasing=True)
            return img_resized
        except Exception as e:
            print(f"Error loading image for comparison {file_path}: {e}")
            return None
    
    def find_images(self):
        """Find all image files in the directory recursively."""
        image_files = []
        print(f"Scanning directory: {self.directory}")
        
        for root, dirs, files in os.walk(self.directory):
            for file in files:
                file_path = Path(root) / file
                if self.is_image_file(file_path):
                    image_files.append(file_path)
        
        print(f"Found {len(image_files)} image files")
        return image_files
    
    def find_exact_duplicates(self, image_files):
        """Find exact duplicates using file hash."""
        print("Finding exact duplicates...")
        
        for file_path in image_files:
            file_hash = self.calculate_file_hash(file_path)
            if file_hash:
                self.file_hashes[file_hash].append(file_path)
        
        # Find duplicates
        exact_duplicates = {hash_val: files for hash_val, files in self.file_hashes.items() if len(files) > 1}
        return exact_duplicates
    
    def find_similar_images(self, image_files):
        """Find similar images using perceptual hashing."""
        print("Finding similar images using perceptual hashing...")
        
        for file_path in image_files:
            phashes = self.calculate_perceptual_hash(file_path)
            if phashes:
                self.images_data[str(file_path)] = phashes
        
        # Group by similar perceptual hashes
        similar_groups = defaultdict(list)
        processed = set()
        
        for file1, hashes1 in self.images_data.items():
            if file1 in processed:
                continue
                
            group = [file1]
            processed.add(file1)
            
            for file2, hashes2 in self.images_data.items():
                if file2 in processed:
                    continue
                
                # Check similarity across different hash types
                similarities = []
                for hash_type in ['average', 'dhash', 'phash', 'whash']:
                    hash1 = ImageHash.hex_to_hash(hashes1[hash_type])
                    hash2 = ImageHash.hex_to_hash(hashes2[hash_type])
                    similarity = 1 - (hash1 - hash2) / len(hash1.hash.flatten())
                    similarities.append(similarity)
                
                # If any hash type shows high similarity, consider them similar
                max_similarity = max(similarities)
                if max_similarity >= self.similarity_threshold:
                    group.append(file2)
                    processed.add(file2)
            
            if len(group) > 1:
                similar_groups[f"group_{len(similar_groups)}"] = group
        
        return similar_groups
    
    def find_structurally_similar(self, image_files, max_comparisons=1000):
        """Find structurally similar images using SSIM."""
        print("Finding structurally similar images...")
        
        if len(image_files) > max_comparisons:
            print(f"Too many images for structural comparison. Limiting to first {max_comparisons} images.")
            image_files = image_files[:max_comparisons]
        
        # Load images
        loaded_images = {}
        for file_path in image_files:
            img_data = self.load_image_for_comparison(file_path)
            if img_data is not None:
                loaded_images[str(file_path)] = img_data
        
        # Compare images
        structural_groups = defaultdict(list)
        processed = set()
        
        for file1, img1 in loaded_images.items():
            if file1 in processed:
                continue
                
            group = [file1]
            processed.add(file1)
            
            for file2, img2 in loaded_images.items():
                if file2 in processed:
                    continue
                
                try:
                    # Calculate structural similarity
                    ssim_value = structural_similarity(img1, img2)
                    if ssim_value >= self.similarity_threshold:
                        group.append(file2)
                        processed.add(file2)
                except Exception as e:
                    print(f"Error comparing {file1} and {file2}: {e}")
                    continue
            
            if len(group) > 1:
                structural_groups[f"structural_group_{len(structural_groups)}"] = group
        
        return structural_groups
    
    def save_results(self, results, output_file="duplicate_images_report.json"):
        """Save results to a JSON file."""
        # Convert Path objects to strings for JSON serialization
        json_results = {}
        for category, groups in results.items():
            json_results[category] = {}
            for group_name, files in groups.items():
                json_results[category][group_name] = [str(f) for f in files]
        
        with open(output_file, 'w') as f:
            json.dump(json_results, f, indent=2)
        
        print(f"Results saved to {output_file}")
    
    def print_results(self, results):
        """Print duplicate findings in a readable format."""
        total_duplicates = 0
        
        for category, groups in results.items():
            if not groups:
                continue
                
            print(f"\n{'='*50}")
            print(f"{category.upper()}")
            print(f"{'='*50}")
            
            for group_name, files in groups.items():
                total_duplicates += len(files) - 1  # -1 because we keep one original
                print(f"\n{group_name}:")
                for i, file_path in enumerate(files):
                    file_size = os.path.getsize(file_path) / 1024  # KB
                    print(f"  {i+1}. {file_path} ({file_size:.1f} KB)")
        
        print(f"\n{'='*50}")
        print(f"SUMMARY")
        print(f"{'='*50}")
        print(f"Total duplicate files found: {total_duplicates}")
        
        # Calculate potential space savings
        potential_savings = 0
        for category, groups in results.items():
            for group_name, files in groups.items():
                if len(files) > 1:
                    # Keep the largest file, delete others
                    file_sizes = [os.path.getsize(f) for f in files]
                    potential_savings += sum(file_sizes) - max(file_sizes)
        
        print(f"Potential space savings: {potential_savings / 1024 / 1024:.2f} MB")
    
    def run(self):
        """Run the duplicate finder."""
        if not self.directory.exists():
            print(f"Error: Directory {self.directory} does not exist.")
            return {}
        
        image_files = self.find_images()
        if not image_files:
            print("No image files found in the specified directory.")
            return {}
        
        results = {}
        
        # Find exact duplicates
        exact_duplicates = self.find_exact_duplicates(image_files)
        results['exact_duplicates'] = exact_duplicates
        
        # Find similar images using perceptual hashing
        similar_images = self.find_similar_images(image_files)
        results['similar_images'] = similar_images
        
        # Find structurally similar images (limit for performance)
        if len(image_files) <= 500:  # Only run structural similarity for smaller sets
            structural_similar = self.find_structurally_similar(image_files)
            results['structural_similar'] = structural_similar
        else:
            print("Skipping structural similarity analysis due to large number of images.")
            results['structural_similar'] = {}
        
        return results

def install_requirements():
    """Install required packages if not available."""
    required_packages = ['Pillow', 'imagehash', 'scikit-image', 'numpy']
    
    for package in required_packages:
        try:
            __import__(package.lower().replace('-', '_'))
        except ImportError:
            print(f"Installing {package}...")
            os.system(f"pip install {package}")

def main():
    parser = argparse.ArgumentParser(description='Find duplicate images in a directory')
    parser.add_argument('directory', nargs='?', default='.', 
                       help='Directory to search for duplicate images (default: current directory)')
    parser.add_argument('--similarity', type=float, default=0.9,
                       help='Similarity threshold (0.0-1.0, default: 0.9)')
    parser.add_argument('--output', default='duplicate_images_report.json',
                       help='Output file for results (default: duplicate_images_report.json)')
    
    args = parser.parse_args()
    
    # Check if required packages are installed
    try:
        from PIL import Image, ImageHash
        from skimage import io, transform
        from skimage.metrics import structural_similarity
    except ImportError:
        print("Required packages not found. Installing...")
        install_requirements()
        # Try importing again
        try:
            from PIL import Image, ImageHash
            from skimage import io, transform
            from skimage.metrics import structural_similarity
        except ImportError:
            print("Failed to install required packages. Please install manually:")
            print("pip install Pillow imagehash scikit-image numpy")
            sys.exit(1)
    
    print("Duplicate Image Finder")
    print("=" * 50)
    
    finder = DuplicateImageFinder(args.directory, args.similarity)
    results = finder.run()
    
    if results:
        finder.print_results(results)
        finder.save_results(results, args.output)
    else:
        print("No results to display.")

if __name__ == "__main__":
    main()