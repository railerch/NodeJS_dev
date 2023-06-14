// Ocultar alertas en ventana de registro
if (window.location.pathname === "/usuarios/crear") {
    let alertas = document.querySelectorAll(".alert");
    setTimeout(() => {
        for (let i = 0; i < alertas.length; i++) {
            alertas[i].style.display = "none";
        }
    }, 3500);
}