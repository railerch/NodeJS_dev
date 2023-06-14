window.onload = function() {

    let chatDiv = document.getElementById("chat");
    let usuario = document.getElementById("usuario");
    let mensaje = document.getElementById("mensaje");
    let broadcast = document.getElementById("broadcast");
    let aviso = document.getElementById("aviso");
    let escribiendo = document.getElementById("escribiendo");
    let ingresarbtn = document.getElementById("ingresar");

    ingresarbtn.addEventListener("click", function() {
        if (usuario.value != "") {
            // Deshabilitar la edicion del nombre de usuario
            usuario.setAttribute("disabled", true);
            ingresarbtn.style.display = "none";

            // Activar y mover el enfoque al campo de mensaje
            mensaje.style.display = "block";
            mensaje.focus();

            // SOCKETS PASO #5 => Usar sockets del lado del cliente
            const socket = io();

            // Enviar mensajes al servidor
            mensaje.addEventListener("keyup", (event) => {
                if (event.key === "Enter") {
                    if (mensaje.value != "" && usuario.value != "") {


                        // Enviar mensaje al servidor a traves del socket
                        socket.emit("message", {
                            usuario: usuario.value,
                            mensaje: mensaje.value
                        })

                        // Limpiar el campo de mensajes
                        mensaje.value = "";

                    } else {
                        console.log("No Message");
                    }
                }
            })

            // Escuchar broadcast enviado desde el servidor
            socket.on("message", (data) => {

                let p = document.createElement("p");
                p.innerHTML = `<span style="color: ${data.color}"><b>${data.usuario}:</b></span> ${data.mensaje}`;
                chatDiv.append(p);

                chatDiv.scrollTop = chatDiv.scrollHeight;

            })

            // INDICAR QUE UN USUARIO ESTA ESCRIBIENDO UN MSJ
            mensaje.addEventListener("keydown", function(event) {
                if (event.code != "Enter") {
                    socket.emit("writing", usuario.value);
                }
            })

            // DETECTAR EVENTOS BROADCAST
            // Nuevo usuario conectado
            socket.on("new_user", (data) => {
                broadcast.style.display = "block";
                broadcast.innerHTML = "AVISO: " + data;
                setTimeout(function() {
                    broadcast.style.display = "none";
                }, 3000)
            })

            // Usuario escribiendo
            socket.on("writing", data => {
                escribiendo.innerHTML = data;
                setTimeout(function() {
                    escribiendo.innerHTML = "";
                }, 2500)
            })

        } else {
            aviso.style.display = "block";
            aviso.innerHTML = "<p>Debe ingresar un nombre de usuario</p>"
            setTimeout(function() {
                aviso.style.display = "none";
            }, 3000)
        }
    })
}