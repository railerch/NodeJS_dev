// Prueba de inicio
console.log("Custom script: OK");

// Limpiar tabla
let limpiarTabCont = document.getElementById("limpiar-tabla-continuar");
limpiarTabCont.addEventListener("click", function(event) {
    window.location.replace("/limpiar");
})

// Eliminar registro
let eliminarReg = document.querySelectorAll(".eliminar-registro");
let eliminarRegCont = document.getElementById("eliminar-registro-continuar");

eliminarReg.forEach(delBtn => {
    delBtn.addEventListener("click", function(event) {
        var id = delBtn.getAttribute("data-id");
        eliminarRegCont.addEventListener("click", function(event) {
            window.location.replace(`/eliminar/${id}`)
        })
    })
})

// actualizar registro
let actualizarReg = document.querySelectorAll(".actualizar-registro");
actualizarReg.forEach(actBtn => {
    actBtn.addEventListener("click", function(event) {
        var id = actBtn.getAttribute("data-id");
        let fila = document.getElementById(id);
        const data = {
            id: fila.querySelector(".id").innerText,
            nombre: fila.querySelector(".nombre").innerText,
            apellido: fila.querySelector(".apellido").innerText,
            cedula: fila.querySelector(".cedula").innerText,
            telefono: fila.querySelector(".telefono").innerText,
            correo: fila.querySelector(".correo").innerText,
            direccion: fila.querySelector(".direccion").innerText
        };
        fetch("/actualizar", {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    })

})