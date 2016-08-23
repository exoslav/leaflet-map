import { mapState } from '../../map/state'

let airticketMap = mapState => {
  console.log(mapState)
  console.log('bistickets map')
  let map = L.map(mapState.opts.targetId, mapState.activeMap.opts)

  mapState.currentMap = map

  L.tileLayer(mapState.activeMap.tiles, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 20,
    id: 'your.mapbox.project.id',
    accessToken: mapState.activeMap.accessToken
  }).addTo(map)

}

airticketMap(mapState)
