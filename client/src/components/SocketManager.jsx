import { useEffect } from "react";
import { io } from "socket.io-client"

//12:11

export const socket = io("http://localhost:3000");

export const SocketManager = () => {
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

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("hello", onHello);

        return () => {
            socket.on("connect", onConnect);
            socket.on("disconnect", onDisconnect);
            socket.on("hello", onHello);
        }
    }, []);
}