import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "http://localhost:5173",
    },
})

io.listen(3000);

io.on("conection", (socket) => {
    console.log("user connected");

    socket.emit("hello");

    socket.on("disconnect", () => {
        console.log("user desconnected")
    })
})
