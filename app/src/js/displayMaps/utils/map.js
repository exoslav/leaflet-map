export let map

export let setMap = mapState => {
  let { opts, tiles, accessToken } = mapState.activeMap
  let map = L.map(mapState.opts.targetId, opts)

  setLayer(map, tiles, accessToken)
}

function setLayer(map, tiles, accessToken) {
  L.tileLayer(tiles, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 20,
    id: 'your.mapbox.project.id',
    accessToken
  }).addTo(map)
}

/*
function setMap(opts) {
  map = L.map(opts.id, validateMapOpts(opts))
  console.log(map)
  map.on('click', e => console.log(e.latlng))
  map.on('zoomstart', e => removeLabels(map, labels))
  map.on('zoomend', e => handleZoomEndEvent(map))
}

function setTiles(tilesURL, accessToken) {
  if(tilesURL === undefined)
    printError(errors, 'CRITICAL', 'missingTilesURL')

  L.tileLayer(tilesURL, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 20,
    id: 'your.mapbox.project.id',
    accessToken
  }).addTo(map)
}

function bindEvents() {
  // map.on('click', openPopupOnClick)
  map.on('zoomend', minimalizeLabels)
}

function openPopupOnClick(e) {
  let popup = L.popup()

  popup
    .setLatLng(e.latlng)
    .setContent(`Kliknuli jste na mape v souradnicich: ${e.latlng.toString()}`)
    .openOn(map)
}
*/
