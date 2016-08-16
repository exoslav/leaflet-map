import { map } from '../map'
import { createAirportLabel } from '../constants'
import { handleClick } from './actions'
import { renderCountryLabels } from '../labels/render'
import { checkAirportPosition, removeEmptyCountries } from './helpers'
import { minimalizeLabels } from '../labels/helpers'
import { geographyStorage } from '../map/geography'

export let airportsStorage = []

export let initializeAirports = (airports) => {
  // createCountries(countries)
  sortAirports(airports)
  createAirports(airports)

  renderCountryLabels(geographyStorage)

  minimalizeLabels()
}

function createAirports(airports) {
  airports.map(airport => {
    let icon = createAirportLabel(airport.name, airport.price)
    let newAirport = L.marker([airport.x, airport.y], {icon}).addTo(map)

    // bind click
    newAirport.on('click', handleClick)

    // attach AJAX airport data
    newAirport.data = airport

    // storage
    airportsStorage.push(newAirport)
  })
}

function sortAirports(airports) {
  airports.map(airport => checkAirportPosition(airport, geographyStorage))

  removeEmptyCountries(geographyStorage)
}
