import { map, setMap } from '../utils/map'
import { mapState } from '../../map/state'
import { errors, printError } from '../../utils/errors'
import { createSwitchMapControls } from '../../utils/controls'

let airticketMap = mapState => {
  // get data
  console.log(mapState)
  // let { dataURL } = mapState
  $.ajax({
    url: mapState.activeMap.dataURL
  })
  .then(data => {
    setMap(mapState)
    /*
    setTiles(opts.tiles, opts.accessToken)

    createGeographyGroups(appState)

    // generateActiveMap(appState)

    initializeAirports(data.airports)
    bindEvents()
    */

    // createSwitchMapControls()
  })
  .fail(err => {
    printError(errors, 'CRITICAL', 'cannotLoadAJAXData')
  })
}

airticketMap(mapState)
