const map = L.map('map', { 
    crs: L.CRS.Simple,
    minZoom: -2,
    maxZoom: 0,
    zoomSnap: 2,
    zoomDelta: 2,
    attributionControl: false
});

const width = 1918;
const height = 1358;

const bounds = [[0, 0], [height, width]];

map.setMaxBounds(bounds);

const normalMap = L.imageOverlay('f451_map_v2.png', bounds);
const detailedMap = L.imageOverlay('f451_map_detailed_v1.png', bounds);

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

map.on('zoomend', function() {
    const zoom = map.getZoom();
    if (zoom === -2) {
        normalMap.setOpacity(1);
        detailedMap.setOpacity(0);
    } else if (zoom === 0) {
        normalMap.setOpacity(0);
        detailedMap.setOpacity(1);
    }
    updateMarkersByZoom(zoom);
});

const markerGroup = L.layerGroup().addTo(map);

const locations = [
    {
        name: "Firehouse",
        coords: [850, 758],
        description: "A place in the center of the city where Montag goes to work. It acts as a symbol of destruction and control in the story, and features Beatty and the Mechanical Hound, symbolizing authority.",
        id: "firehouse"
    },
    {
        name: "Montag's House",
        coords: [451, 1283],
        description: "A place in the suburbs where Montag and his wife, Mildred, live. It represents Montag's life before he thinks more about himself and the world around him. The house has three parlor walls, and is described as numb and isolated at the start of the story.",
        id: "montag_house"
    },
    {
        name: "Faber's House",
        coords: [1176, 613],
        description: "A dusty and old house filled with books, where the former English professor Faber lives. The house is hidden in a rundown part of the city. This house and its books symbolize hidden knowledge in Fahrenheit 451’s society.",
        id: "faber_house"
    },
    {
        name: "Clarisse's House",
        coords: [480, 1372],
        description: "This is the home of Clarisse, which is located very close to Montag’s house. The house is presented as a warm and lively home, with open windows, soft voices, and candles, very much contrasting with the other houses in the neighborhood.",
        id: "clarisse_house"
    },
    {
        name: "Park Bench",
        coords: [953, 100],
        description: "A quiet space covered in trees and far away from the noisy city, where Montag met Faber a year ago. This place is shaded with trees, and it symbolizes human connection.",
        id: "park_bench"
    },
    {
        name: "Subway Station (Montag's House)",
        coords: [421, 1393],
        description: "Subway stations in Fahrenheit 451 are loud public spaces designed to try their best to distract people from their seashells. Montag goes to this subway station every day in order to go to work.",
        id: "subway_station"
    },
    {
        name: "Subway Station (Faber's House)",
        coords: [1104, 620],
        description: "Subway stations in Fahrenheit 451 are loud public spaces designed to try their best to distract people from their seashells. This station is named the Knoll View station, which gives a peaceful feeling to Faber’s house.",
        id: "subway_station"
    },
    {
        name: "Subway Station (Firehouse)",
        coords: [752, 614],
        description: "Subway stations in Fahrenheit 451 are loud public spaces designed to try their best to distract people from their seashells. This station is where Montag goes to work, located a short path away from the Firehouse.",
        id: "subway_station"
    },
    {
        name: "The Corner",
        coords: [441, 1355],
        description: "The corner between the path from the subway station to Montag’s house, where Montag meets Clarisse. At the start of the story, this is where Clarisse asks the question, “Are you happy.”",
        id: "corner"
    },
    {
        name: "The River",
        coords: [674, 1575],
        description: "Descriptions here",
        id: "river"
    }
];

function updateMarkersByZoom(zoom) {
    markerGroup.clearLayers();
    if (zoom === 0) {
        locations.forEach(location => {
            const marker = L.marker(location.coords, { icon: myIcon }).addTo(markerGroup);
            marker.bindTooltip(location.name, {
                permanent: true,
                direction: "top",
                className: "label"
            });
            marker.bindPopup(`
                <div class="popup-box">
                    <h4>${location.name}</h4>
                    <p>${location.description}</p>
                    <img src="${location.id}.jpg" alt="${location.name}" class="popup-image">
                    <a href="#${location.id}" class="more-link">Show more</a>
                </div>
            `, { closeButton: false });
            marker.on('popupopen', () => marker.closeTooltip());
            marker.on('popupclose', () => marker.openTooltip());
        });
    }
}

updateMarkersByZoom(map.getZoom());
