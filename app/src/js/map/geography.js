import { countries } from '../../../data/countries'
import { continents } from '../../../data/continents'

export let geographyStorage = []

export let geoData = {
  countries,
  continents
}

export let createGeographyGroups = appState => {
  // reset
  geographyStorage = []

  appState.map.displayMaps.map(displayMap => {
    displayMap.layers.map(layer => {
      if(layer.name !== 'cities') {
        let newLayer = {
          layerName: layer.name,
          items: []
        }

        geographyStorage.push(newLayer)

        geoData[layer.name].map(item => {
          newLayer.items.push({
            name: item.features[0].properties.name,
            shortName: item.features[0].id || '',
            airports: [],
            area: {
              type: item.features[0].geometry.type,
              coor: item.features[0].geometry.coordinates
            }
          })
        })
      }

    })
  })
}
