import { countriesStorage, setCountriesStorage } from '../storage'

export let queryOpts = {
  'format': 'json',
  'addressdetails': 1,
  'accept-language': 'en-gb'
}

// export let buildQuery = (x, y, opts) => {
//   let url = `http://nominatim.openstreetmap.org/search.php?q=${x}+${y}`
//   if(typeof opts === 'object')
//     Object.keys(queryOpts).forEach(key => {
//       url += `&${key.toString()}=${queryOpts[key].toString()}`
//     })
//   return url
// }

export let checkAirportPosition = (airport, geographyStorage) => {
  let inside = false
  let x = airport.x, y = airport.y

  geographyStorage.map(area => {
    for(let c = 0; c < area.items.length; c++) {
      let place = area.items[c]
      let name = place.name
      let polygonType = place.area.type
      let polyPoints = place.area.coor[0]

      if(polygonType === 'MultiPolygon') {
        for (let g = 0; g < place.area.coor.length; g++) {
          polyPoints = place.area.coor[g][0]

          for (let i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
            let xi = polyPoints[i][1], yi = polyPoints[i][0]
            let xj = polyPoints[j][1], yj = polyPoints[j][0]

            let intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
            if (intersect) inside = !inside
          }

          if(inside) {
            place.airports.push(airport)
            return inside;
          }
        }
      } else {
        for (let i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
          let xi = polyPoints[i][1], yi = polyPoints[i][0]
          let xj = polyPoints[j][1], yj = polyPoints[j][0]

          let intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
          if (intersect) inside = !inside
        }

        if(inside) {
          place.airports.push(airport)
          return inside
        }
      }
    }
  })

  return inside
}

// export let checkAirportPosition = (airport, countries) => {
//   let inside = false
//   let x = airport.x, y = airport.y
//
//   for(let c = 0; c < countries.length; c++) {
//     let name = countries[c].features[0].properties.name
//     let polygonType = countries[c].features[0].geometry.type
//     let polyPoints = countries[c].features[0].geometry.coordinates[0]
//
//     if(polygonType === 'MultiPolygon') {
//       for (let g = 0; g < countries[c].features[0].geometry.coordinates.length; g++) {
//         polyPoints = countries[c].features[0].geometry.coordinates[g][0]
//
//         for (let i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
//           let xi = polyPoints[i][1], yi = polyPoints[i][0]
//           let xj = polyPoints[j][1], yj = polyPoints[j][0]
//
//           let intersect = ((yi > y) != (yj > y))
//           && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
//           if (intersect) inside = !inside
//         }
//
//         if(inside) {
//           // console.log(airport)
//           addAirportToCountryStorage(airport, name)
//           return inside;
//         }
//       }
//
//     } else {
//       for (let i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
//         let xi = polyPoints[i][1], yi = polyPoints[i][0]
//         let xj = polyPoints[j][1], yj = polyPoints[j][0]
//
//         let intersect = ((yi > y) != (yj > y))
//         && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
//         if (intersect) inside = !inside
//       }
//
//       if(inside) {
//         addAirportToCountryStorage(airport, name)
//         return inside;
//       }
//     }
//   }
//
//   return inside;
// }


// function addAirportToCountryStorage(airport, countryName) {
//   countriesStorage.map(country => {
//     if(countryName === country.name)
//       country.airports.push(airport)
//   })
// }

// ze setu vyfiltruje jen mista, ktera maji letiste
export let removeEmptyCountries = data => {
  Object.keys(data).forEach(key => {
    let filteredData = data[key].items.filter(place => place.airports.length >= 1)

    data[key].items = filteredData
  })

  // setCountriesStorage(filteredCountries)
}
