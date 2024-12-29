import { ContactShadows, Environment, OrbitControls, useCursor } from "@react-three/drei";

import { AnimatedWoman } from "./AnimatedWoman";
import { useAtom } from "jotai";
import { charactersAtom, mapAtom, socket, userAtom } from "./SocketManager";
import { useState } from "react";
import * as THREE from "three";
import { Items } from "./items";
import { useThree } from "@react-three/fiber";
import { useGrid } from "../hooks/useGrid";

export const Experience = () => {

  const [characters] = useAtom(charactersAtom);
  const [map] = useAtom(mapAtom);
  const [onFloor, setOnFloor] = useState(false);
  useCursor(onFloor);
  const {vector3ToGrid, gridToGrid3} = useGrid();

  const scene = useThree((state) => state.scene);
  const [user] = useAtom(userAtom);

  const onCharacterMove = (e) => {
    const character = scene.getObjectByName(`character-${user}`);
    if(!character) return;
    socket.emit(
      "move", 
      vector3ToGrid(character.position), 
      vector3ToGrid(e.point)
    );
  }

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
        onClick={onCharacterMove}
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
            path={character.path}
            position={ gridToGrid3(character.position) }
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
