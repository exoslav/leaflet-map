import { constants } from '../constants'
import { validateMapOpts } from './helpers'
import { createGeographyGroups } from './geography'
import { handleZoomEndEvent } from './actions'
import { errors, printError } from '../errors'
import { initializeAirports } from '../airports'
import { labels } from '../labels/render'
import { removeLabels, minimalizeLabels } from '../labels/helpers'
import { appState, setInitialAppState } from '../appState'

export let map

export let initializeMap = (opts = {
  mapOpts: {
    id: 'map',
    initZoom: 5,
    minZoom: 4,
    maxZoom: 13,
    center: [50.0598053, 14.3251985] // Prague
  },
  dataURL: 'data/data.json',
  tiles: undefined,
  accessToken: undefined
}) => {
  $.getJSON(opts.dataURL)
  .then(data => {
    setInitialAppState(opts)

    setMap(opts.mapOpts)
    setTiles(opts.tiles, opts.accessToken)

    createGeographyGroups(appState)

    // generateActiveMap(appState)

    initializeAirports(data.airports)
    bindEvents()
  })
  .fail(err => {
    printError(errors, 'CRITICAL', 'cannotLoadAJAXData')
  })
}

// export let generateActiveMap(appState) {
//
// }

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
