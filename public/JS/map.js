
maptilersdk.config.apiKey = mapKey;
const map = new maptilersdk.Map({
    container: 'map', // container's id or the HTML element in which the SDK will render the map
    style: maptilersdk.MapStyle.STREETS,
    center: points, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

const marker = new maptilersdk.Marker({color:'red'})
.setLngLat(points)
.addTo(map);
