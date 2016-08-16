import { errors, printError } from './errors'

export let appState = {
  map: {
    totalMaps: 0,
    activeMap: '',
    initZoom: undefined,
    displayMaps: []
  }
}

export let setActiveMap = val => appState.map.activeMap = val

export let setInitialAppState = opts => {
  if(!typeof opts.displayMaps === 'array' || opts.displayMaps.length === 0)
    printError(errors, 'CRITICAL', 'missingDisplayMaps')

  appState.map.displayMaps = opts.displayMaps

  appState.map.totalMaps = opts.displayMaps.length

  appState.map.initZoom = opts.mapOpts.zoom || undefined

  opts.displayMaps.map(map => {
    if(map.state === 'active')
      appState.map.activeMap = map
  })

  window.appState = appState
}
