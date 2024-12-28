import { ContactShadows, Environment, OrbitControls, useCursor } from "@react-three/drei";

import { AnimatedWoman } from "./AnimatedWoman";
import { useAtom } from "jotai";
import { charactersAtom, socket } from "./SocketManager";
import { useState } from "react";
export const Experience = () => {

  const [characters] = useAtom(charactersAtom);
  const [onFloor, setOnFloor] = useState(false);
  useCursor(onFloor? "pointer" : "auto");

  return (
    <>
      <Environment preset="sunset" /> {/* ilumnacion por defecto */}
      <ambientLight intensity={.3} />
      <ContactShadows blur={2} />
      <OrbitControls />
      <mesh rotation-x={-Math.PI / 2}
        position-y={[-0.001]}
        onClick={(e) => socket.emit("move"[e.point.x, 0, e.point.z])}
        onPointerEnter={() => setOnFloor(true)}
        onPointerLeave={() => setOnFloor(false)}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={"#f0f0f0"} />
      </mesh>
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
