const center = [37.7599904,-122.4536476]

const map = tomtom.map('map', {
  center,
  zoom: 14,
  key: 'V6iEh5xVqo3mBAHEe3reZYZG10yAhbBt',
  source: 'vector',
  basePath: '/tomtomSDK',
})



// const bounds = [
//   [37.798228, -122.518443],
//   [37.704575, -122.343863]
// ]

// const markers = [
//   [37.7568453, -122.4578464],
//   [37.7599043, -122.4256016],
//   [37.7610579, -122.4094225]
// ]

// markers.forEach(marker => tomtom.L.marker(marker).addTo(map))
// map.fitBounds(bounds)

tomtom.controlPanel({
    position: 'bottomright',
    title: 'Settings',
    collapsed: true,
    closeOnMapClick: false
  })
  .addTo(map)

const markerOptions = {
  icon: tomtom.L.svgIcon({
    icon: {
      icon: 'fa fa-camera',
      iconSize: [32, 37],
      iconAnchor: [16, 2],
      style: {
        color: '#fff'
      },
      noPlainSVG: true
    }
  })
};

tomtom.L.marker([43.26456, -71.5702], markerOptions).addTo(map);


map.on('click', e => {
  tomtom.L.popup().setLatLng(e.latlng).setContent(e.latlng.toString()).openOn(map)
  tomtom.L.marker(e.latlng, markerOptions).addTo(map);
})
