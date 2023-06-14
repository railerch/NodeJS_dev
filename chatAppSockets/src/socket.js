// Generador de colores
function generar_color() {
    let r = parseInt(Math.random() * 100);
    let g = parseInt(Math.random() * 100);
    let b = parseInt(Math.random() * 100);
    return `rgb(1${r},1${g},1${b})`;
}

// SOCKETS PASO #3 => Procesar eventos recibidos del usuario
module.exports = (io) => {
    // Escuchar evento de conexion
    io.on("connection", (socket) => {
        console.log("Incoming Socket connection");

        // EMITIR EVENTOS BROADCAST
        // Nuevo usuario
        socket.broadcast.emit("new_user", "Nuevo usuario conectado");

        // Usuario escribiendo
        socket.on("writing", data => {
            socket.broadcast.emit("writing", `<span style="color:blue">${data}</span> esta escribiendo un mensaje...`)
        })

        // Captrurar mensajes enviados desde el cliente
        let mensajes = colores = [];
        socket.on("message", (data) => {

            // Generar color de nombre para el nombre de usuario
            if (colores != "") {
                let found = false;

                // Buscar el usuario en el array de colores
                colores.forEach(usr => {
                    if (usr.nombre === data.usuario) {
                        console.log("With data: Indicando color");
                        data.color = usr.color;
                        found = true;
                    }

                })

                // Si el usuario no esta en el array de colores se le asigna uno
                if (!found) {
                    console.log("With data/notFound: Indicando color");
                    let color = generar_color();
                    colores.push({ nombre: data.usuario, color: color });
                    data.color = color;
                }

            } else {
                console.log("Without data: Asignando color a nuevo usuario");
                colores.push({ nombre: data.usuario, color: generar_color() });
                colores.forEach(usr => {
                    if (usr.nombre === data.usuario) {
                        data.color = usr.color;
                    }
                })
            }

            // Guardar mensajes
            mensajes.push(data);

            // Hacer broadcast del msj recibido
            io.emit("message", data);

            // Datos actuales del usuario
            console.log("MENSAJES DEL USUARIO:");
            console.log(mensajes);
            console.log("COLOR DEL USUARIO:");
            console.log(colores);
        })

        // Escuchar evento de desconexion
        socket.on("disconnect", () => {
            console.log("Socket connection finished");
        })
    })
}