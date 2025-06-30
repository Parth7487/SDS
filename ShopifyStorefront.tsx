import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const ShopifyStorefront = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const { scale } = useSpring({
    scale: 1,
    from: { scale: 0 },
    config: { tension: 200, friction: 50 },
  });

  return (
    <animated.group ref={groupRef} scale={scale}>
      {/* Main device frame */}
      <RoundedBox
        args={[3, 4, 0.2]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color="#1a1a1a" />
      </RoundedBox>

      {/* Screen */}
      <RoundedBox
        args={[2.6, 3.4, 0.05]}
        radius={0.05}
        smoothness={4}
        position={[0, 0, 0.12]}
      >
        <meshStandardMaterial color="#0A192F" />
      </RoundedBox>

      {/* Header bar */}
      <mesh position={[0, 1.4, 0.13]}>
        <boxGeometry args={[2.4, 0.3, 0.01]} />
        <meshStandardMaterial color="#00FFB2" />
      </mesh>

      {/* Product cards */}
      <mesh position={[-0.6, 0.3, 0.13]}>
        <boxGeometry args={[1, 0.8, 0.01]} />
        <meshStandardMaterial color="#ffffff" opacity={0.9} transparent />
      </mesh>
      <mesh position={[0.6, 0.3, 0.13]}>
        <boxGeometry args={[1, 0.8, 0.01]} />
        <meshStandardMaterial color="#ffffff" opacity={0.9} transparent />
      </mesh>

      {/* Bottom navigation */}
      <mesh position={[0, -1.4, 0.13]}>
        <boxGeometry args={[2.4, 0.4, 0.01]} />
        <meshStandardMaterial color="#00FFB2" opacity={0.8} transparent />
      </mesh>

      {/* Floating elements */}
      <mesh position={[-2, 1, 1]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#00FFB2" />
      </mesh>
      <mesh position={[2.2, -0.5, 0.8]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-1.8, -1.2, 1.2]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#00FFB2" />
      </mesh>
    </animated.group>
  );
};

export default ShopifyStorefront;
