let map;
let markers = [];
let infoWindows = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 37.7749, lng: -122.4194 },
    });

    const locations = [
        {
            position: { lat: 37.7749, lng: -122.4194 },
            info: "<h3>Montag's House</h3><p>Montag begins as a fireman who burns books.</p>"
        },
        {
            position: { lat: 37.7799, lng: -122.4294 },
            info: "<h3>Clarisse</h3><p>She makes Montag question society.</p>"
        },
        {
            position: { lat: 37.7849, lng: -122.4094 },
            info: "<h3>Fire Station</h3><p>Symbol of censorship and control.</p>"
        },
        {
            position: { lat: 37.7649, lng: -122.4194 },
            info: "<h3>Old Woman</h3><p>Her death changes Montag completely.</p>"
        },
        {
            position: { lat: 37.7549, lng: -122.4294 },
            info: "<h3>River Escape</h3><p>Montag escapes the city.</p>"
        },
        {
            position: { lat: 37.7449, lng: -122.4394 },
            info: "<h3>Forest</h3><p>A new beginning with the book people.</p>"
        }
    ];

    locations.forEach((location, index) => {
        const marker = new google.maps.Marker({
            position: location.position,
            map: map
        });

        const infoWindow = new google.maps.InfoWindow({
            content: location.info
        });

        marker.addListener("click", () => {
            // Close all other popups first
            infoWindows.forEach(iw => iw.close());

            infoWindow.open(map, marker);
        });

        markers.push(marker);
        infoWindows.push(infoWindow);
    });
}

function goToLocation(index) {
    map.setCenter(markers[index].getPosition());
    map.setZoom(14);

    // Open popup when clicking timeline button
    infoWindows.forEach(iw => iw.close());
    infoWindows[index].open(map, markers[index]);
}
