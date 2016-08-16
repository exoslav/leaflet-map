import { map } from '../map'

export let polylineStorage = []

export let createPolyline = (coor, styles = {
  color: 'red',
  weight: 2,
  opacity: .5
}) => {
  let newPolyline = L.polyline(coor, styles)

  // add to map
  newPolyline.addTo(map)

  // store
  polylineStorage.push()
}
