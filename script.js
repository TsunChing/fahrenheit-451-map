const map = L.map('map', { 
    crs: L.CRS.Simple,
    minZoom: -2,
    maxZoom: 0,
    zoomSnap: 2,
    zoomDelta: 2,
});

const width = 2000;
const height = 1200;

const bounds = [[0, 0], [height, width]];

map.setMaxBounds (bounds);

const normalMap= L.imageOverlay('map.png', bounds);
const detailedMap = L.imageOverlay('map_detailed.png', bounds);

normalMap.addTo(map);
detailedMap.addTo(map);
map.fitBounds(bounds);
detailedMap.setOpacity(0);

const myIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div class="marker-dot"></div>',
    iconSize: [20, 20],
    iconAnchor: [9, 10]
});

map.on('zoomend', function(){
    const zoom = map.getZoom();
    if (zoom === -2) {
        normalMap.setOpacity(1);
        detailedMap.setOpacity(0);
    } else if (zoom === 0) {
        normalMap.setOpacity(0);
        detailedMap.setOpacity(1);
    }
});

//Edit basic descriptioons and locations here :)
const locations = [
    {
    name: "City A",
    coords: [300, 500],
    description: "A heavily controlled urban area where books are banned.",
    id: "city-a"
    },
    {
    name: "Mountains",
    coords: [800, 1200],
    description: "A remote area representing freedom and escape.",
    id: "mountains"
    },
    {
    name: "River",
    coords: [600, 900],
    description: "Montag escapes here and follows it to safety.",
    id: "river"
    },
    {
    name: "Bookstore",
    coords: [400, 700],
    description: "A hidden place where Montag discovers forbidden knowledge.",
    id: "bookstore"
    }
];

locations.forEach(location => {
    const marker = L.marker(location.coords, {icon: myIcon}).addTo(map);

    marker.bindTooltip(location.name, {
        permanent: true,
        direction: "top",
        className: "label"
     });

    marker.bindPopup(`
        <div class="popup-box">
            <h4>${location.name}</h4>
            <p>${location.description}</p>
            <a href="#${location.id}" class="more-link">Show more</a>
        </div>
     `,{
        closeButton: false,
     });

    marker.on('popupopen', () => {
        marker.closeTooltip();
     });

    marker.on('popupclose', () => {
        marker.openTooltip();
    });
});
