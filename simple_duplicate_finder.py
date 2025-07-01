#!/usr/bin/env python3
"""
Simple Duplicate Image Finder

This script finds duplicate images using file hash comparison (exact duplicates only).
It uses only standard library modules, so no additional dependencies are required.

Usage:
    python simple_duplicate_finder.py [directory_path]
    
If no directory is specified, it will search the current directory.
"""

import os
import sys
import hashlib
import argparse
from pathlib import Path
from collections import defaultdict
import json
import time

# Common image extensions
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.tiff', '.tif', '.svg', '.ico'}

class SimpleDuplicateFinder:
    def __init__(self, directory):
        self.directory = Path(directory)
        self.file_hashes = defaultdict(list)
        self.size_groups = defaultdict(list)
        
    def is_image_file(self, file_path):
        """Check if file is an image based on extension."""
        return file_path.suffix.lower() in IMAGE_EXTENSIONS
    
    def calculate_file_hash(self, file_path):
        """Calculate MD5 hash of file content."""
        try:
            hash_md5 = hashlib.md5()
            with open(file_path, 'rb') as f:
                # Read file in chunks to handle large files efficiently
                for chunk in iter(lambda: f.read(8192), b""):
                    hash_md5.update(chunk)
            return hash_md5.hexdigest()
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
            return None
    
    def get_file_info(self, file_path):
        """Get file information including size and modification time."""
        try:
            stat = file_path.stat()
            return {
                'size': stat.st_size,
                'modified': stat.st_mtime,
                'path': str(file_path)
            }
        except Exception as e:
            print(f"Error getting file info for {file_path}: {e}")
            return None
    
    def find_images(self):
        """Find all image files in the directory recursively."""
        image_files = []
        print(f"Scanning directory: {self.directory}")
        
        try:
            for root, dirs, files in os.walk(self.directory):
                for file in files:
                    file_path = Path(root) / file
                    if self.is_image_file(file_path):
                        image_files.append(file_path)
        except PermissionError as e:
            print(f"Permission denied accessing some directories: {e}")
        except Exception as e:
            print(f"Error scanning directory: {e}")
            
        print(f"Found {len(image_files)} image files")
        return image_files
    
    def group_by_size(self, image_files):
        """Group files by size as a first optimization step."""
        print("Grouping files by size...")
        
        for file_path in image_files:
            try:
                file_size = file_path.stat().st_size
                self.size_groups[file_size].append(file_path)
            except Exception as e:
                print(f"Error getting size for {file_path}: {e}")
        
        # Only keep groups with more than one file
        potential_duplicates = []
        for size, files in self.size_groups.items():
            if len(files) > 1:
                potential_duplicates.extend(files)
        
        print(f"Found {len(potential_duplicates)} files with duplicate sizes")
        return potential_duplicates
    
    def find_exact_duplicates(self, image_files):
        """Find exact duplicates using file hash."""
        print("Finding exact duplicates...")
        
        # First group by size for efficiency
        potential_duplicates = self.group_by_size(image_files)
        
        if not potential_duplicates:
            print("No potential duplicates found (no files with same size)")
            return {}
        
        # Calculate hashes only for files with duplicate sizes
        print(f"Calculating hashes for {len(potential_duplicates)} potential duplicates...")
        
        for i, file_path in enumerate(potential_duplicates):
            if i % 10 == 0 and i > 0:
                print(f"  Processed {i}/{len(potential_duplicates)} files...")
                
            file_hash = self.calculate_file_hash(file_path)
            if file_hash:
                self.file_hashes[file_hash].append(file_path)
        
        # Find actual duplicates
        exact_duplicates = {}
        for hash_val, files in self.file_hashes.items():
            if len(files) > 1:
                exact_duplicates[hash_val] = files
        
        return exact_duplicates
    
    def analyze_duplicates(self, duplicates):
        """Analyze duplicate groups and provide recommendations."""
        analysis = {
            'total_groups': len(duplicates),
            'total_duplicate_files': 0,
            'total_wasted_space': 0,
            'recommendations': []
        }
        
        for hash_val, files in duplicates.items():
            if len(files) <= 1:
                continue
                
            # Get file info for all files in group
            file_infos = []
            for file_path in files:
                info = self.get_file_info(file_path)
                if info:
                    file_infos.append(info)
            
            if len(file_infos) <= 1:
                continue
            
            # Sort by modification time (keep newest) or by path length (keep shortest path)
            file_infos.sort(key=lambda x: (-x['modified'], len(x['path'])))
            
            # Calculate wasted space (all files except the one to keep)
            file_size = file_infos[0]['size']
            wasted_space = file_size * (len(file_infos) - 1)
            
            analysis['total_duplicate_files'] += len(file_infos) - 1
            analysis['total_wasted_space'] += wasted_space
            
            # Create recommendation
            keep_file = file_infos[0]['path']
            delete_files = [info['path'] for info in file_infos[1:]]
            
            analysis['recommendations'].append({
                'keep': keep_file,
                'delete': delete_files,
                'file_size_kb': file_size / 1024,
                'space_saved_kb': wasted_space / 1024
            })
        
        return analysis
    
    def save_results(self, duplicates, analysis, output_file="duplicate_images_report.json"):
        """Save results to a JSON file."""
        results = {
            'scan_info': {
                'directory': str(self.directory),
                'scan_time': time.strftime('%Y-%m-%d %H:%M:%S'),
                'total_groups': analysis['total_groups'],
                'total_duplicate_files': analysis['total_duplicate_files'],
                'total_wasted_space_mb': analysis['total_wasted_space'] / 1024 / 1024
            },
            'duplicate_groups': {},
            'recommendations': analysis['recommendations']
        }
        
        # Convert duplicate groups to JSON-serializable format
        for i, (hash_val, files) in enumerate(duplicates.items()):
            group_name = f"group_{i+1}"
            results['duplicate_groups'][group_name] = {
                'hash': hash_val,
                'files': [str(f) for f in files],
                'file_count': len(files)
            }
        
        try:
            with open(output_file, 'w') as f:
                json.dump(results, f, indent=2)
            print(f"Results saved to {output_file}")
        except Exception as e:
            print(f"Error saving results: {e}")
    
    def print_results(self, duplicates, analysis):
        """Print duplicate findings in a readable format."""
        print(f"\n{'='*60}")
        print(f"DUPLICATE IMAGE ANALYSIS RESULTS")
        print(f"{'='*60}")
        
        if not duplicates:
            print("No duplicate images found!")
            return
        
        print(f"Directory scanned: {self.directory}")
        print(f"Duplicate groups found: {analysis['total_groups']}")
        print(f"Total duplicate files: {analysis['total_duplicate_files']}")
        print(f"Total wasted space: {analysis['total_wasted_space'] / 1024 / 1024:.2f} MB")
        
        print(f"\n{'='*60}")
        print(f"DUPLICATE GROUPS")
        print(f"{'='*60}")
        
        for i, (hash_val, files) in enumerate(duplicates.items(), 1):
            print(f"\nGroup {i} ({len(files)} files, Hash: {hash_val[:8]}...):")
            
            for j, file_path in enumerate(files, 1):
                try:
                    file_size = file_path.stat().st_size / 1024  # KB
                    mod_time = time.strftime('%Y-%m-%d %H:%M:%S', 
                                           time.localtime(file_path.stat().st_mtime))
                    print(f"  {j}. {file_path}")
                    print(f"     Size: {file_size:.1f} KB, Modified: {mod_time}")
                except Exception as e:
                    print(f"  {j}. {file_path} (Error reading file info: {e})")
        
        print(f"\n{'='*60}")
        print(f"RECOMMENDATIONS")
        print(f"{'='*60}")
        
        for i, rec in enumerate(analysis['recommendations'], 1):
            print(f"\nGroup {i}:")
            print(f"  KEEP: {rec['keep']}")
            print(f"  DELETE ({len(rec['delete'])} files):")
            for file_to_delete in rec['delete']:
                print(f"    - {file_to_delete}")
            print(f"  Space saved: {rec['space_saved_kb']:.1f} KB")
    
    def generate_cleanup_script(self, analysis, script_file="cleanup_duplicates.sh"):
        """Generate a shell script to delete duplicate files."""
        try:
            with open(script_file, 'w') as f:
                f.write("#!/bin/bash\n")
                f.write("# Generated script to clean up duplicate images\n")
                f.write("# Review carefully before running!\n\n")
                f.write("set -e  # Exit on any error\n\n")
                
                total_files = 0
                total_space = 0
                
                for i, rec in enumerate(analysis['recommendations'], 1):
                    f.write(f"# Group {i} - Keep: {rec['keep']}\n")
                    for file_to_delete in rec['delete']:
                        f.write(f'echo "Deleting: {file_to_delete}"\n')
                        f.write(f'rm "{file_to_delete}"\n')
                        total_files += 1
                        total_space += rec['space_saved_kb']
                    f.write("\n")
                
                f.write(f"# Summary: Would delete {total_files} files, saving {total_space:.1f} KB\n")
                f.write('echo "Cleanup completed!"\n')
            
            # Make script executable
            os.chmod(script_file, 0o755)
            print(f"Cleanup script generated: {script_file}")
            print("Review the script carefully before running it!")
            
        except Exception as e:
            print(f"Error generating cleanup script: {e}")
    
    def run(self, generate_script=True):
        """Run the duplicate finder."""
        if not self.directory.exists():
            print(f"Error: Directory {self.directory} does not exist.")
            return {}
        
        if not self.directory.is_dir():
            print(f"Error: {self.directory} is not a directory.")
            return {}
        
        print(f"Starting duplicate image scan...")
        start_time = time.time()
        
        # Find all image files
        image_files = self.find_images()
        if not image_files:
            print("No image files found in the specified directory.")
            return {}
        
        # Find exact duplicates
        duplicates = self.find_exact_duplicates(image_files)
        
        # Analyze results
        analysis = self.analyze_duplicates(duplicates)
        
        # Print results
        self.print_results(duplicates, analysis)
        
        # Save results
        self.save_results(duplicates, analysis)
        
        # Generate cleanup script
        if generate_script and duplicates:
            self.generate_cleanup_script(analysis)
        
        end_time = time.time()
        print(f"\nScan completed in {end_time - start_time:.2f} seconds")
        
        return duplicates, analysis

def main():
    parser = argparse.ArgumentParser(description='Find duplicate images in a directory')
    parser.add_argument('directory', nargs='?', default='.', 
                       help='Directory to search for duplicate images (default: current directory)')
    parser.add_argument('--no-script', action='store_true',
                       help='Don\'t generate cleanup script')
    parser.add_argument('--output', default='duplicate_images_report.json',
                       help='Output file for results (default: duplicate_images_report.json)')
    
    args = parser.parse_args()
    
    print("Simple Duplicate Image Finder")
    print("=" * 50)
    print("This tool finds exact duplicate images using file hash comparison.")
    print("It requires no external dependencies.\n")
    
    finder = SimpleDuplicateFinder(args.directory)
    results = finder.run(generate_script=not args.no_script)
    
    if not results:
        print("No results to display.")
    else:
        duplicates, analysis = results
        if duplicates:
            print(f"\nFound {len(duplicates)} groups of duplicate images.")
            print(f"You can save {analysis['total_wasted_space'] / 1024 / 1024:.2f} MB by removing duplicates.")
        else:
            print("\nNo duplicate images found!")

if __name__ == "__main__":
    main()