console.log("JS Active => GeolocMongoDB");

// Containers
var dataContainer = document.getElementById("position-initial");
var dataContainerW = document.getElementById("position-watch");
var errContainer = document.getElementById("err-container");

// Options
const options = {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0
}

// Success callback
function success_initial(pos) {
    console.log(pos);
    var coords = pos.coords;
    var lat = coords.latitude;
    var long = coords.longitude;
    var acc = coords.accuracy;

    var latNode = document.createElement("p");
    var longNode = document.createElement("p");
    var accNode = document.createElement("p");

    latNode.innerHTML = `<b>Latitude: </b>${lat}`;
    longNode.innerHTML = `<b>Longitude: </b>${long}`;
    accNode.innerHTML = `<b>Accuracy: </b>${acc}`;

    dataContainer.appendChild(latNode);
    dataContainer.appendChild(longNode);
    dataContainer.appendChild(accNode);

}

// Success callback
function success_watch(pos) {
    console.log(pos);
    var coords = pos.coords;
    var lat = coords.latitude;
    var long = coords.longitude;
    var acc = coords.accuracy;

    var latNode = document.createElement("p");
    var longNode = document.createElement("p");
    var accNode = document.createElement("p");

    latNode.innerHTML = `<b>Latitude: </b>${lat}`;
    longNode.innerHTML = `<b>Longitude: </b>${long}`;
    accNode.innerHTML = `<b>Accuracy: </b>${acc}`;

    dataContainerW.innerHTML = "";
    dataContainerW.appendChild(latNode);
    dataContainerW.appendChild(longNode);
    dataContainerW.appendChild(accNode);

}

// Error callback
function error(err) {
    dataContainer.innerHTML = dataContainerW.innerHTML = "<b style='color:red'>Error de ubicacion</b>";
    console.warn(`ERROR ${err.code}: ${err}`);
}

// Get location
navigator.geolocation.getCurrentPosition(success_initial, error, options);
navigator.geolocation.watchPosition(success_watch, error, options);