import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FloatingShape = ({
  position,
  children,
  speed = 1,
  rotationSpeed = 1,
}: {
  position: [number, number, number];
  children: React.ReactNode;
  speed?: number;
  rotationSpeed?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      ref.current.rotation.x += 0.01 * rotationSpeed;
      ref.current.rotation.y += 0.01 * rotationSpeed;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      {children}
    </mesh>
  );
};

const FloatingShapes = () => {
  return (
    <>
      <FloatingShape position={[-8, 2, -5]} speed={0.8} rotationSpeed={0.5}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          color="#00FFB2"
          transparent
          opacity={0.6}
          roughness={0.1}
          metalness={0.8}
        />
      </FloatingShape>

      <FloatingShape position={[8, -1, -3]} speed={1.2} rotationSpeed={0.7}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          roughness={0.2}
          metalness={0.9}
        />
      </FloatingShape>

      <FloatingShape position={[-6, -3, -4]} speed={0.6} rotationSpeed={1.2}>
        <octahedronGeometry args={[0.8]} />
        <meshStandardMaterial
          color="#00FFB2"
          transparent
          opacity={0.4}
          wireframe
        />
      </FloatingShape>

      <FloatingShape position={[6, 4, -6]} speed={1.5} rotationSpeed={0.3}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
          emissive="#00FFB2"
          emissiveIntensity={0.2}
        />
      </FloatingShape>

      <FloatingShape position={[0, 6, -8]} speed={0.9} rotationSpeed={0.8}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial
          color="#00FFB2"
          transparent
          opacity={0.5}
          roughness={0}
          metalness={1}
        />
      </FloatingShape>
    </>
  );
};

export default FloatingShapes;
