let map;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 37.7749, lng: -122.4194 },
    });

    const locations = [
        {
            position: { lat: 37.7749, lng: -122.4194 },
            info: "<h3>Montag</h3><p>Beginning of the story.</p>"
        },
        {
            position: { lat: 37.7799, lng: -122.4294 },
            info: "<h3>Clarisse</h3><p>She changes Montag.</p>"
        },
        {
            position: { lat: 37.7849, lng: -122.4094 },
            info: "<h3>Fire Station</h3><p>Burning books.</p>"
        },
        {
            position: { lat: 37.7649, lng: -122.4194 },
            info: "<h3>Old Woman</h3><p>Turning point.</p>"
        },
        {
            position: { lat: 37.7549, lng: -122.4294 },
            info: "<h3>River Escape</h3><p>Montag escapes.</p>"
        },
        {
            position: { lat: 37.7449, lng: -122.4394 },
            info: "<h3>Forest</h3><p>New beginning.</p>"
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
            infoWindow.open(map, marker);
        });

        markers.push(marker);
    });
}

function goToLocation(index) {
    map.setCenter(markers[index].getPosition());
    map.setZoom(14);
}
