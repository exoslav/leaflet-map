import { initPreloader } from '../utils/preloaders'
import { runCustomFunctions, validateMapOpts } from './helpers'
import { mapState, setInitialMapState } from './state'
import { loadMap } from './loadMap'

export let initializeMap = opts => {
  // volani custom preInit funkci, pokud nejake existuji
  runCustomFunctions(opts.customFunctions.preInitFunctions)

  // inicializace udaju potrebnych k nacteni mape
  setInitialMapState(validateMapOpts(opts))

  loadMap(mapState.activeMap)

  // setMap(opts)
}
