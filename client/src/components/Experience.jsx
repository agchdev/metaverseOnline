import { ContactShadows, Environment, OrbitControls, useCursor } from "@react-three/drei";

import { AnimatedWoman } from "./AnimatedWoman";
import { useAtom } from "jotai";
import { charactersAtom, mapAtom, socket } from "./SocketManager";
import { useState } from "react";
import * as THREE from "three";
import { Items } from "./items";
export const Experience = () => {

  const [characters] = useAtom(charactersAtom);
  const [map] = useAtom(mapAtom);
  const [onFloor, setOnFloor] = useState(false);
  useCursor(onFloor);

  return (
    <>
      <Environment preset="sunset" /> {/* ilumnacion por defecto */}
      <ambientLight intensity={.3} />
      <OrbitControls />
      {
        map.items.map((item, idx) => (
          <Items key={`${item.name}-${idx}`} item={item} />
        ))
      }
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={[-0.001]}
        onClick={(e) => socket.emit("move", [e.point.x, 0, e.point.z])}
        onPointerEnter={() => setOnFloor(true)}
        onPointerLeave={() => setOnFloor(false)}
        position-x={map.size[0] / 2}
        position-z={map.size[1] / 2}
      >
        <planeGeometry args={map.size} />
        <meshStandardMaterial color={"#f0f0f0"} />
      </mesh>
      {
        characters.map((character) => (
          <AnimatedWoman
            key={character.id}
            id={character.id}
            position={
              new THREE.Vector3(
                character.position[0] / map.gridDivision + 1 / map.gridDivision / 2,
                0,
                character.position[2] / map.gridDivision + 1 / map.gridDivision / 2,
              )
            }
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
