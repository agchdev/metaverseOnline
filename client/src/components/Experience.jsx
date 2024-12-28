import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";

import { AnimatedWoman } from "./AnimatedWoman";
import { useAtom } from "jotai";
import { charactersAtom } from "./SocketManager";
export const Experience = () => {

  const [characters] = useAtom(charactersAtom);

  return (
    <>
      <Environment preset="sunset" /> {/* ilumnacion por defecto */}
      <ambientLight intensity={.3} />
      <ContactShadows blur={2} />
      <OrbitControls />
      {
        characters.map((character) => (
          <AnimatedWoman
            key={character.id}
            position={character.position}
            hairColor={character.hairColor}
            topColor={character.topColor}
            bottomColor={character.BottomColor}
          />
        ))
      }
      {/*<AnimatedWoman />  IMPRIMO A LA MUJER POR PANTALLA 
      <AnimatedWoman position-x={1} hairColor="red" topColor="blue" /> */}
      {/* <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>  ---> Muestra un cuno por defecto con los materiales normales*/}
    </>
  );
};
