import { Server } from "socket.io";

export const initSocket = (httpServer) => {
    const io = new Server(httpServer, { // aqui eu passo o http server que vem do app.js
        cors: { origin: '*' } // aqui eu permito que qualquer origem se conecte
    });
    io.on("connection", (socket) => {
        console.log("a user connected", socket.id);

        socket.on("join_projext", (projectId) => { // aqui eu recebo o id do projeto
            socket.join(projectId); // aqui eu adiciono o socket ao projeto
        })
        socket.on("disconnect", () => {
            console.log("user disconnected", socket.id);
        })
    })
    return io // aqui eu retorno o io para que ele possa ser usado em outros arquivos
}