const map = L.map('map', { 
    crs: L.CRS.Simple,
    minZoom: -4,
    maxZoom: 0,
    zoomSnap: 2,
    zoomDelta: 2,
    attributionControl: false
});

const width = 12344;
const height = 9882;

const bounds = [[0, 0], [height, width]];

map.setMaxBounds(bounds);

const normalMap = L.imageOverlay('f451_map_final.svg', bounds);
const detailedMap = L.imageOverlay('f451_map_detailed_final.svg', bounds);

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
    if (zoom === -4) {
        normalMap.setOpacity(1);
        detailedMap.setOpacity(0);
    } else if (zoom === -2) {
        normalMap.setOpacity(0);
        detailedMap.setOpacity(1);
    }
    updateMarkersByZoom(zoom);
});

const markerGroup = L.layerGroup().addTo(map);

const locations = [
    {
        name: "Firehouse",
        coords: [5456, 5555],
        description: "A place in the center of the city where Montag goes to work. It acts as a symbol of destruction and control in the story, and features Beatty and the Mechanical Hound, symbolizing authority.",
        id: "firehouse"
    },
    {
        name: "Montag's House",
        coords: [4273, 7088],
        description: "A place in the suburbs where Montag and his wife, Mildred, live. It represents Montag's life before he thinks more about himself and the world around him. The house has three parlor walls, and is described as numb and isolated at the start of the story.",
        id: "montag_house"
    },
    {
        name: "Faber's House",
        coords: [6395, 5130],
        description: "A dusty and old house filled with books, where the former English professor Faber lives. The house is hidden in a rundown part of the city. This house and its books symbolize hidden knowledge in Fahrenheit 451’s society.",
        id: "faber_house"
    },
    {
        name: "Clarisse's House",
        coords: [4358, 7352],
        description: "This is the home of Clarisse, which is located very close to Montag’s house. The house is presented as a warm and lively home, with open windows, soft voices, and candles, very much contrasting with the other houses in the neighborhood.",
        id: "clarisse_house"
    },
    {
        name: "Park Bench",
        coords: [5725, 3641],
        description: "A quiet space covered in trees and far away from the noisy city, where Montag met Faber a year ago. This place is shaded with trees, and it symbolizes human connection.",
        id: "park_bench"
    },
    {
        name: "Subway Station (Montag's House)",
        coords: [4151, 7413],
        description: "Subway stations in Fahrenheit 451 are loud public spaces designed to try their best to distract people from their seashells. Montag goes to this subway station every day in order to go to work.",
        id: "subway_station"
    },
    {
        name: "Subway Station (Faber's House)",
        coords: [6193, 5174],
        description: "Subway stations in Fahrenheit 451 are loud public spaces designed to try their best to distract people from their seashells. This station is named the Knoll View station, which gives a peaceful feeling to Faber’s house.",
        id: "subway_station"
    },
    {
        name: "Subway Station (Firehouse)",
        coords: [5152, 5136],
        description: "Subway stations in Fahrenheit 451 are loud public spaces designed to try their best to distract people from their seashells. This station is where Montag goes to work, located a short path away from the Firehouse.",
        id: "subway_station"
    },
    {
        name: "The Corner",
        coords: [4265, 7305],
        description: "The corner between the path from the subway station to Montag’s house, where Montag meets Clarisse. At the start of the story, this is where Clarisse asks the question, “Are you happy.”",
        id: "corner"
    },
    {
        name: "The River",
        coords: [4915, 7952],
        description: "The river is where Montag escapes from the city and begins a new stage of his journey. He allows the current to carry him away from the police and the Mechanical Hound. The river symbolizes freedom, change, and a fresh start after leaving his old life behind.",
        id: "river"
    },
    {
        name: "Autumn City-center Streets",
        coords: [4593, 7140],
        description: "The city streets in the season of fall serve as a stage that contrived multiple major scenes in the novel. From Montag’s first acquaintance with Clarisse, the relationship with the sagacious professor, the extremely shocking murder, and the thrilling escape of Montag the fugitive. The interconnected streets cover numerous cardinal points that contribute to the frequently twisting plotline.",
        id: "autumn_city_center_streets"
    },
    {
        name: "Tents",
        coords: [3237, 6205],
        description: "The tents are highly pragmatic as they serve a range of functions involving communication of Montag with others, resting, and a place to temporarily refresh after Montag’s horrific and exciting journey. The tents are set up by a lot of people who pursue knowledge just like Montag. They are highly portable and inhabit the heart of the forest, led by Granger as the head of his team.",
        id: "tents"
    },
    {
        name: "Gas Station",
        coords: [4198, 7585],
        description: "The gas station is a temporary location during Montag’s escape journey. In the novel, Montag went into the lavatory of the gas station after he killed the fireman, Beatty. There is also a range of cars that line up in a queue to refill gas, although the ignorance of people made this ordinary fueling scene extremely chaotic, as described in the book. ",
        id: "gas_station"
    },
    {
        name: "Riverside Path",
        coords: [4268, 7660],
        description: "The Riverside Path is a street that allows numerous cars to fastly transport along the river. This avenue is also a pivotal point where Montag escaped along the river and into the outback region. This path is absolutely vital since it connects the two scenes of the story, dividing the suburbs and the urban areas. Showing another shift in the plotline.",
        id: "riverside_path"
    },
    {
        name: "Countryside field",
        coords: [3700, 7747],
        description: "The field of the countryside is Montag’s first stop in his escape journey that leads to the forest. The field is packed with hays and bushes that Montag thought were suitable for concealing himself away from the police and mechanical hounds pursuing him. After the mechanical hound sought its route, Montag escaped further into the forest.",
        id: "countryside_field"
    },
    {
        name: "Forest",
        coords: [3400, 7647],
        description: "The forest is the setting where Montag escaped to. This place ranges across the southern territory of the city, also known as the outback region. In the book, the forest plays a significant role, providing shelter for the sagacious people, and it’s also the site of a critical scene where vital supplies like tents and a campfire are allocated. ",
        id: "forest"
    },
    {
        name: "Alleyways & Main roads",
        coords: [5250,6430],
        description: "The alleyways and main roads appear during Montag’s escape from the city. He moves through dark alleys to avoid being seen while the busy roads are filled with fast-moving cars. These locations show the danger of his situation and the contrast between hiding and being exposed.",
        id: "alleyways_main_roads"
    },
    {
        name: "Abandoned Tracks",
        coords: [6799, 5785],
        description: "The abandoned railroad tracks lead Montag away from the city after he escapes through the river. By following them, he eventually meets Granger and the group of book lovers. The tracks symbolize a different path in life, one based on knowledge, learning, and independent thinking.",
        id: "abandoned_tracks"
    },
    {
        name: "Abandoned Tracks",
        coords: [3287, 6988],
        description: "The abandoned railroad tracks lead Montag away from the city after he escapes through the river. By following them, he eventually meets Granger and the group of book lovers. The tracks symbolize a different path in life, one based on knowledge, learning, and independent thinking.",
        id: "abandoned_tracks"
    },
    {
        name: "Clarisse’s School",
        coords: [4810, 5710],
        description: "Clarisse’s school helps readers understand the problems in society. She explains that students spend little time having discussions or thinking deeply about ideas. Instead, they focus on entertainment and activities. The school reflects a system that discourages curiosity and independent thought.",
        id: "clarisse_school"
    },
    {
        name: "Old Woman's House",
        coords: [4250, 5150],
        description: "The old woman’s house is one of the most important locations in Fahrenheit 451. When the firemen discover her hidden books, they arrive to burn them. Instead of leaving, the woman chooses to stay in the house and die with her books. This event has a major impact on Montag.",
        id: "old_woman_house"
    },
    {
        name: "Mechanical Hound Kennel",
        coords: [5606, 5795],
        description: "The Mechanical Hound Kennel is where the Mechanical Hound is kept when it is not being used. Montag feels uncomfortable whenever he visits because the Hound seems to dislike him. The kennel represents the government’s use of technology to monitor, control, and punish people.",
        id: "mechanical_hound_kennel"
    }
];

function updateMarkersByZoom(zoom) {
    markerGroup.clearLayers();

    if (zoom >= -2) {
        locations.forEach(location => {
            const marker = L.marker(location.coords, { icon: myIcon }).addTo(markerGroup);

            marker.bindTooltip(location.name, {
                permanent: false,
                direction: "top",
                className: "label"
            });

            marker.bindPopup(`
                <div class="popup-box">
                    <h4>${location.name}</h4>
                    <p>${location.description}</p>
                    <img src="${location.id}.png" alt="${location.name}" class="popup-image" style="max-width: 300px;" align="center">
                    <a href="#${location.id}" class="more-link">Show more</a>
                </div>
            `, { closeButton: false });

            marker.on('mouseover', function () {
                marker.openTooltip();
            });

            marker.on('mouseout', function () {
                marker.closeTooltip();
            });
        });
    }
}

updateMarkersByZoom(map.getZoom());