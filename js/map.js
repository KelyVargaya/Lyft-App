//Variable Global
const ruta = {
    variable: {
        map: undefined,
        //cajaTextoDestino: undefined,
    },

    inicio: function () {
        ruta.variable.map = new google.maps.Map($("#map")[0], {
            zoom: 10,
            center: { lat: -33.4724728, lng: -70.9100251 },
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false
        });

            // Ubicacion de Origen 
            let cajaTextoOrigen = document.getElementById('origen');
            let autocompletaOrigen = new google.maps.places.Autocomplete(cajaTextoOrigen);
            autocompletaOrigen.bindTo('bounds', ruta.variable.map);
            let detallesOrigen = new google.maps.InfoWindow();
            let marcadorOrigen = ruta.marcadorMapa(ruta.variable.map);

            ruta.autocompletar(autocompletaOrigen, detallesOrigen, marcadorOrigen);

            //Ubicacion de Destino
            let cajaTextoDestino = document.getElementById('destino');
            let autocompletarDestino = new google.maps.places.Autocomplete(cajaTextoDestino);
            autocompletarDestino.bindTo('bounds', ruta.variable.map);
            let detalleDestino = new google.maps.InfoWindow();
            let marcaDestino = ruta.marcadorMapa(ruta.variable.map);

            ruta.autocompletar(autocompletarDestino, detalleDestino, marcaDestino);

            // Ruta 
            let directionsService = new google.maps.DirectionsService;
            let direccionMostrar = new google.maps.DirectionsRenderer;

            document.getElementById("ruta").addEventListener("click", function () {
                 ruta.trazarRuta(directionsService, direccionMostrar) });

            direccionMostrar.setMap(ruta.variable.map);
            ruta.ubicacionActual();
    },

    ubicacionActual: function(){
            //Mi ubicación actual 
            $("#encuentrame").click (ruta.buscar);
            //ruta.variable.cajaTextoDestino = $("#destino");
    },

    autocompletar: function (autocomplete, infoWindows, marcador) {
            autocomplete.addListener('place_changed', function () {
                infoWindows.close();
                marcador.setVisible(false);
                let place = autocomplete.getPlace();
                ruta.marcarUbicacion(place, infoWindows, marcador);
            });
    },

    buscar: function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(ruta.ubicacionAutomatica, ruta.error);
            }
    },

    error: function (error) {
        alert("Tenemos un problema para encontrar tu ubicación... Intenta de Nuevo");
    },

    ubicacionAutomatica: function (position) {
        let latitude, longitude;
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            marcaOrigen.setPosition(new google.maps.LatLng(latitude, longitude));
            ruta.variable.map.setCenter({ lat: latitude, lng: longitude });
            ruta.variable.map.setZoom(17);

            marcaOrigen.setVisible(true);

            detallesOrigen.setContent('<div><strong>Mi ubicación actual</strong><br>');
            detallesOrigen.open(ruta.variable.map, marcaOrigen);
        },

    marcarUbicacion: function (place, infoWindows, marcador) {
        if (!place.geometry) {
          // Error si no encuentra el lugar indicado
            window.alert("No encontramos el lugar que indicaste: " + place.name + "XD!!!");
            return;
        }
            // geometria del lugar presentarlo en un mapa.
        if (place.geometry.viewport) {
            ruta.variable.map.fitBounds(place.geometry.viewport);
        } else {
            ruta.variable.map.setCenter(place.geometry.location);
            ruta.variable.map.setZoom(17);
            }

            marcador.setPosition(place.geometry.location);
            marcador.setVisible(true);

            let address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }

            infoWindows.setContent('<div><strong>' + place.name + '</strong><br>' + address);
            infoWindows.open(ruta.variable.map, marcador);
        },
    marcadorMapa: function (map) {
            let icono = {
                url: 'http://icons.iconarchive.com/icons/sonya/swarm/128/Bike-icon.png',
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            };

            let marcador = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                icon: icono,
                anchorPoint: new google.maps.Point(0, -29)
            });

            return marcador;
        },

    trazarRuta: function (directionsService, direccionMostrar) {
        let origin = document.getElementById("origen").value;
        let destination = document.getElementById('destino').value;

            if (destination != "" && destination != "") {
                directionsService.route({
                    origin: origin,
                    destination: destination,
                    travelMode: "DRIVING"
                },
                    function (response, status) {
                        if (status === "OK") {
                            direccionMostrar.setDirections(response);
                        } else {
                            ruta.errorRoute();
                    }
                });
            }
        },

    errorRuta: function(){
        alert("No ingresaste un origen y un destino validos... Vuelve a intentarlo");
        }
    }

    function initMap(){
        ruta.inicio();
}