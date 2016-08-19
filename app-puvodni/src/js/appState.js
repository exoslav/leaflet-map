import { errors, printError } from './errors'
import { getCurrentViewLayer } from './map/actions'

export let appState = {
  map: {
    totalMaps: 0,
    activeMap: '',
    initZoom: undefined,
    displayMaps: [],
    currentViewLayer: ''
  }
}

export let setActiveMap = val => appState.map.activeMap = val

export let setInitialAppState = (opts, map) => {
  if(!typeof opts.displayMaps === 'array' || opts.displayMaps.length === 0)
    printError(errors, 'CRITICAL', 'missingDisplayMaps')

  appState.map.displayMaps = opts.displayMaps

  appState.map.totalMaps = opts.displayMaps.length

  appState.map.initZoom = opts.mapOpts.zoom || undefined

  opts.displayMaps.map(map => {
    if(map.state === 'active')
      appState.map.activeMap = map
  })

  // setridi pole vzestupne
  let sortNumber = (a, b) => a - b

  appState.map.activeMap.layers.map(layer => {
    let zoomName = layer.name
    let zoomRange = layer.zoom.split('-').sort(sortNumber)

    zoomRange.map(zoom => {
      if(opts.mapOpts.zoom >= zoomRange[0] && opts.mapOpts.zoom <= zoomRange[1])
        appState.map.currentViewLayer = zoomName
    })

  })

  window.appState = appState
}
