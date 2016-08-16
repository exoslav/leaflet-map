import { map } from './index'
import { appState } from '../appState'

// setridi pole vzestupne
let sortNumber = (a, b) => a - b

export let handleZoomEndEvent = () => {
  let currentZoom = map.getZoom()

  appState.map.activeMap.layers.map(layer => {
    let zoomName = layer.name
    let zoomRange = layer.zoom.split('-').sort(sortNumber)
    // console.log(currentZoom, zoomName, zoomRange)

    zoomRange.map(zoom => {
      if(currentZoom >= zoomRange[0] && currentZoom <= zoomRange[1])
        console.log(zoomName)
    })

  })
}
