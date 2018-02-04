const center = [37.7599904,-122.4536476]
const zoom = 13

const map = tomtom.map('map', {
  center,
  zoom,
  key: 'V6iEh5xVqo3mBAHEe3reZYZG10yAhbBt',
  source: 'vector',
  basePath: 'http://api.tomtom.com/maps-sdk-js/4.15.0/examples/sdk/',
})

tomtom.controlPanel({
    position: 'bottomright',
    title: 'Settings',
    collapsed: true,
    closeOnMapClick: false
  })
  .addTo(map)

function markerOptions(iconUrl) {
  return {
    icon: tomtom.L.icon({
      iconUrl,
      iconSize: [60, 60],
      iconAnchor: [15, 34]
    })
  }
};

window.pins = new UserPins();

map.on('click', e => {
  pins.add(e.latlng)
  showPinSelector();
})

function UserPins() {
  this.points = []
  this.current = null

  this.add = function(latlng, uuid) {
    const newPin = {
      latlng,
      uuid: !uuid ? guid() : uuid
    }
    this.points.push(newPin)
    this.current = newPin.uuid
  }

  this.setIcon = function(iconUrl) {
    const point = this.points.filter(point => point.uuid == this.current)
    if (point.length) {
      point[0].iconUrl = iconUrl
      tomtom.L.marker(point[0].latlng, markerOptions(iconUrl)).addTo(map);
    }
  }

  this.getUrl = function() {
   return `${window.location.href}?points=${JSON.stringify(this.points)}`
  }

  this.loadMap = function() {
    var pointsParam = getJsonFromUrl().points
    if (pointsParam) {
      const points = JSON.parse(pointsParam)
      if (points && points.length) {
        let centerDefined = false
        points.forEach(point => {
          if (point.iconUrl) {
            this.add(point.latlng, point.uuid)
            this.setIcon(point.iconUrl)
            if (!centerDefined) {
              const customCenter = [point.latlng.lat, point.latlng.lng]
              map.setView(customCenter, zoom);
              centerDefined = true
            }
          }
        })
      }
    }
  }

  this.loadMap()
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

function getJsonFromUrl() {
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}
