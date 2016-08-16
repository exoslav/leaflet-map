import { map } from '../map'
import { geographyStorage } from '../map/geography'
import { countriesCentres } from '../../../data/center-states'
import { continentsCenteres } from '../../../data/center-continents'

let centers = {
  countriesCentres,
  continentsCenteres
}

export let renderCountryLabels = geographyStorage => {
  let iconIndex = 0
  geographyStorage.map(area => {
    area.items.map(place => {
      let airportPrices = []
      place.airports.map(airport => airportPrices.push(airport.price))

      let lowestPrice = airportPrices.reduce((prev, cur) => prev.price < cur.price ? prev : cur)

      let centerPoint = {}
      Object.keys(centers).forEach(key => {
        for (let i = 0; i < centers[key].length; i++) {
          if(centers[key][i].FULL_NAME === place.name || centers[key][i].SHORT_NAME === place.name) {
            centerPoint.x = centers[key][i].LAT, centerPoint.y = centers[key][i].LONG
            break
          }
        }
      })

      let icon = createAirportLabel(lowestPrice, place.name, place.shortName, iconIndex)
      let newLabel = L.marker([centerPoint.x, centerPoint.y], {icon}).addTo(map)

      newLabel.on('click', () => console.log('label was clicked...'))

      iconIndex++
    })

  })
}

function createAirportLabel(lowestPrice, longName, shortName, i) {
  return L.divIcon({
    className: `airport-label-lowest-price airport-label-lowest-price-${i}`,
    html: `
    <div>
      <span class="name">
        <b class="long">${longName}</b>
        <b class="short">${shortName}</b>
      </span>
      <span class="currency">již od CZK</span>
      <span class="price">${lowestPrice},-</span>
    </div>`
  })
}
