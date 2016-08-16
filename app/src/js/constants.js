// L.Icon.Default.imagePath = 'app/src/images'

export let icon = L.icon({
  iconUrl: 'app/src/images/marker-icon.png',
  iconSize:     [25, 25]
})

export let createAirportLabel = (name, price) => {
  return L.divIcon({
    className: 'airport-label',
    // html: `
    //   <span>${name}</span>
    //   <span>${price}</span>`
  })
}
