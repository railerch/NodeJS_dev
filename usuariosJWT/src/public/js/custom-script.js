console.log("Custom JS Ok");

// Salir
if (window.location.pathname.match("/users/all")) {
    let salir = document.getElementById("salir");
    salir.addEventListener("click", function() {
        window.location.replace("/logout");
    })
}