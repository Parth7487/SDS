import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const Loading3DCanvas = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Loading spheres */}
      <mesh position={[-1, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#00FFB2" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#00FFB2" />
      </mesh>
      <mesh position={[1, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#00FFB2" />
      </mesh>

      {/* Loading text */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.3}
        color="#00FFB2"
        anchorX="center"
        anchorY="middle"
      >
        Loading...
      </Text>

      {/* Ambient lighting for the loading elements */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 5]} intensity={0.8} color="#00FFB2" />
    </group>
  );
};

export default Loading3DCanvas;
