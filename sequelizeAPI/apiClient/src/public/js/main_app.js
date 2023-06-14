console.log("APP.JS ok");

// CONSULTAR URL
let consultarBtn = document.getElementById("consultar-btn");
consultarBtn.addEventListener("click", function () {
    let url = document.getElementById("url");
    let resDiv = document.getElementById("respuesta");

    if (url.value != "") {
        fetch(url.value, { mode: "no-cors" })
            .then(res => res.json())
            .then(res => {
                resDiv.innerText = res
                setTimeout(function () {
                    resDiv.innerText = "";
                }, 2000)
            });
        // Reiniciar campo de consulta
        url.value = "";
    } else {
        resDiv.innerHTML = "<h3 style='color:red'><i class='icon-cancel' style='font-size:1.5em'></i> Debe especificar una URL valida.</h3>"
        setTimeout(function () {
            resDiv.innerText = "";
        }, 2000)
    }

})
