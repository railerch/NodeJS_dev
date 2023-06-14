// Redireccionar a los 5 segundos desde lapagina de error
if (window.location.pathname === "/error") {
    setTimeout(function() {
        window.location.replace("/");
    }, 5000)
}

// Editar pais
let editarBtn = document.querySelectorAll(".editar-pais");
editarBtn.forEach(btn => {
    btn.addEventListener("click", function() {
        let id = this.getAttribute("data-id");
        fetch(`/editar/${id}`, { method: "GET" })
            .then(res => {
                return res.json();
            }).then(res => {
                // Datos
                let data = JSON.parse(res);

                // DOM 
                let id = document.getElementById("id-edit");
                let nombre = document.getElementById("nombre-edit");
                let ubicacion = document.getElementById("ubicacion-edit");
                let descripcion = document.getElementById("descripcion-edit");

                // Valores
                id.value = data[0].id;
                nombre.value = data[0].nombre;
                ubicacion.value = data[0].ubicacion;
                descripcion.value = data[0].descripcion;

            })
    })
})

// Eliminar pais
let eliminarBtn = document.querySelectorAll(".eliminar-pais");
let eliminarBtnModal = document.getElementById("eliminar-pais-modal-btn");
eliminarBtn.forEach(btn => {
    console.log(eliminarBtnModal)
    btn.addEventListener("click", function() {
        let id = this.getAttribute("data-id");
        eliminarBtnModal.setAttribute("href", `/eliminar/${id}`);
    })
})