import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { AnimatedWoman } from "./AnimatedWoman";
export const Experience = () => {
  return (
    <>
      <Environment preset="sunset" /> {/* ilumnacion por defecto */}
      <ambientLight intensity={.3} />
      <ContactShadows blur={2} />
      <OrbitControls />
      <AnimatedWoman /> {/* IMPRIMO A LA MUJER POR PANTALLA */}
      <AnimatedWoman position-x={1} hairColor="red" topColor="blue" />
      {/* <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>  ---> Muestra un cuno por defecto con los materiales normales*/}
    </>
  );
};
