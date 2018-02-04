const center = [37.7599904,-122.4536476]

const map = tomtom.map('map', {
  center,
  zoom: 12,
  key: 'V6iEh5xVqo3mBAHEe3reZYZG10yAhbBt',
  source: 'vector',
  basePath: '/tomtomSDK',
})

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

window.pins = new UserPins();

map.on('click', e => {
  pins.add(e.latlng)
})

function UserPins() {
  this.points = []
  this.current = null

  this.add = function(latlng) {
    const newPin = {
      latlng,
      uuid: guid()
    }
    this.points.push(newPin)
    this.current = newPin.uuid
  }

  this.setIcon = function(category) {
    const point = this.points.filter(point => point.uuid == this.current)
    if (point.length) {
      tomtom.L.marker(point[0].latlng, markerOptions).addTo(map);
    }
  }
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
