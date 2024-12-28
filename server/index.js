import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "http://localhost:5173",
    },
})

io.listen(3001);

const characters = []; // Array de caracteres que ser iran importando a medida que la gente se vaya uniendo al servidor

const generateRandomPosition = () => {
    return [Math.random() * 3, 0, Math.random() * 3];
}

const generateRandomHexColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

io.on("connection", (socket) => {
    console.log("user connected");

    characters.push({
        id: socket.id,
        position: generateRandomPosition(),
        hairColor: generateRandomHexColor(),
        topColor: generateRandomHexColor(),
        BottomColor: generateRandomHexColor(),
    })

    socket.emit("hello"); // Se refiere a que solo esa persona recibe ese mensaje
    io.emit("characters", characters); // Se refiere a que todo el mundo recibe ese mensaje

    socket.on("disconnect", () => {
        console.log("user desconnected");
        characters.splice(characters.findIndex((character) => character.id === socket.id),
            1
        );

    })
})
