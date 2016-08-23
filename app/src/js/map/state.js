import { errors, printError } from '../utils/errors'

export let mapState = {
  opts: {},
  totalMaps: 0,
  activeMap: {},
  displayMaps: [],
  loadedMaps: []
}

export let setInitialMapState = opts => {
  // kotrola, zda existuji mapy, ktere chceme zobrazit
  if(opts.displayMaps.constructor === Array && opts.displayMaps.length >= 1)
    mapState.totalMaps = opts.displayMaps.length
  else
    printError(errors, 'CRITICAL', 'missingDisplayMaps')

  // pridani opts pro globalni pristup
  mapState.opts = opts

  // pridani map
  mapState.displayMaps = opts.displayMaps

  // pridani aktivni mapy
  let activeStateMap = false
  opts.displayMaps.map(map => {
    if(map.state === 'active' && !activeStateMap) {
      mapState.activeMap = map
      activeStateMap = !activeStateMap
    }
    else if(map.state === 'active' && activeStateMap)
      printError(errors, 'WARNING', 'duplicatedActiveDisplayMapOpt')
  })

  window.mapState = mapState
}
