import { GradientTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import  { useEffect, useRef, type JSX } from "react";

function AnimatedSphere(props: JSX.IntrinsicElements["mesh"]) {
  const mesh = useRef<any>(null!);
  useFrame((_state, _delta) => {
    mesh.current.rotation.y += 0.002;
  });

//   useEffect(() => {
//     const handleResize = () => {
//       if (mesh.current) {
//         mesh.current.scale.set(window.innerWidth / 1000, window.innerHeight / 1000, 1);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

  return (
    <perspectiveCamera fov={45} position={[0, 0, -500]}>
      <mesh {...props} ref={mesh}>
        <sphereGeometry args={[200, 20, 20]} />
        <meshBasicMaterial
          color={"FF0000"}
          wireframe={true}
          wireframeLinewidth={2}
        >
            <GradientTexture
                stops={[0, 1]}
                colors={["#ed0911", "#ed7f09"]}
            />
        </meshBasicMaterial>
      </mesh>
    </perspectiveCamera>
  );
}

export const WireframeSphere = () => {
  return (
        <Canvas>
          <AnimatedSphere />
          <perspectiveCamera aspect={1} fov={40} position={[0, 0, 1000]} />
        </Canvas>
  );
};