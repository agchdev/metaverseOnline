import { useEffect } from "react";
import { io } from "socket.io-client"
import { atom, useAtom } from "jotai";
//12:11

export const socket = io("http://localhost:3001");
export const charactersAtom = atom([]);

export const SocketManager = () => {
    const [_characters, setCharacters] = useAtom(charactersAtom);
    useEffect(() => {
        function onConnect() {
            console.log("Connected");
        }
        function onDisconnect() {
            console.log("Disconnected");
        }

        function onHello() {
            console.log("Hello")
        }

        function onCharacters(value) {
            console.log("Received characters:", value);
            setCharacters(value);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("hello", onHello);
        socket.on("characters", onCharacters);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("hello", onHello);
            socket.off("characters", onCharacters);
        }
    }, []);
}