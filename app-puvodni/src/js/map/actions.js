import { map } from './index'
import { geographyStorage } from './geography'
import { appState } from '../appState'
import { renderLabels } from '../labels/render'

// setridi pole vzestupne
let sortNumber = (a, b) => a - b

export let handleZoomEndEvent = map => {
  let currentZoom = map.getZoom()

  appState.map.activeMap.layers.map(layer => {
    let zoomName = layer.name
    let zoomRange = layer.zoom.split('-').sort(sortNumber)
    // console.log(currentZoom, zoomName, zoomRange)

    zoomRange.map(zoom => {
      if(currentZoom >= zoomRange[0] && currentZoom <= zoomRange[1]) {
        appState.map.currentViewLayer = zoomName
        console.log(zoomName)
      }
    })

  })

  renderLabels(geographyStorage)
}
