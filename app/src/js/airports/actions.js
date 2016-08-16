import {
  toAirport,
  fromAirport,
  setToAirport,
  setFromAirport
} from './state'
import { queryOpts, /*buildQuery,*/ checkAirportPosition } from './helpers'
import { createPolyline } from '../polylines/polyline'
// import countries from '../countries.js'

export let handleClick = e => {
  console.log('point marker was clicked...')
  if(toAirport === null) {
    setToAirport(e.target)
    handleAction()
  }
  else if (toAirport.data.iata === e.target.data.iata)
    return
  else {
    setToAirport(e.target)
    handleAction()
  }
}

function handleAction() {
  console.log('handeling airport click...')

  // let airportCountry = checkAirportPosition(toAirport.data.x, toAirport.data.y, statesData.features[0].geometry.coordinates[0])
  // let airportCountry = checkAirportPosition(toAirport.data.x, toAirport.data.y, countries)
  // console.log(airportCountry)
  // let url = buildQuery(toAirport.data.x, toAirport.data.y, queryOpts)
  // $.get(url, data => {
  //   console.log(data[0].address)
  // })
  // 'http://nominatim.openstreetmap.org/search.php?q=51.1541%2C+-0.1638&polygon=1&viewbox='
  // let from = e.target._latlng
  // let to = {lat: 50.1094, lng: 14.2612}
  //
  // let coor = [from, new L.LatLng(50.1094, 14.2612)]
  // createPolyline(coor)
}
