module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("Incoming connection...");

        // COnnection finish
        socket.on("disconnect", () => {
            console.log("Connection finished...");
        })
    })
}