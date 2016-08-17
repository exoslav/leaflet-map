export let removeLabels = (map, labels) => labels.map(label => map.removeLayer(label))

export let minimalizeLabels = () => {
  const boxHeight = 94 // !!! vyska boxu
  const boxesStorage = $('.airport-label-lowest-price')
  const offsetStorage = []

  boxesStorage.removeClass('small')

  boxesStorage.map(boxItem => {
    const current = $(boxesStorage[boxItem])

    const currentTop    = current.offset().top
    const currentBottom = current.offset().top + boxHeight
    // const currentBottom = current.offset().top + current.outerHeight()
    const currentLeft   = current.offset().left
    const currentRight  = current.offset().left + current.find('span').outerWidth()
    // const currentRight  = current.offset().left + current.outerWidth()

    boxesStorage.map(item => {
      const inner = $(boxesStorage[item])

      if(inner.context.className.split(' ')[2] !== current.context.className.split(' ')[2]) {
        const innerTop    = inner.offset().top
        const innerBottom = inner.offset().top + boxHeight
        // const innerBottom = inner.offset().top + inner.outerHeight()
        const innerLeft   = inner.offset().left
        const innerRight  = inner.offset().left + inner.find('span').outerWidth()
        // const innerRight  = inner.offset().left + inner.outerWidth()

      // if(current.context.className.split(' ')[2] === 'two' && inner.context.className.split(' ')[2] === 'one') {
      // 	console.log('inner', currentTop, currentBottom, currentLeft, currentRight)
      //   console.log('current', currentTop, currentBottom, currentLeft, currentRight)
      // }

      if(
           ((innerTop >= currentTop && innerTop <= currentBottom) || (innerBottom >= currentTop && innerBottom <= currentBottom)) &&
           ((innerLeft >= currentLeft && innerLeft <= currentRight) || (innerRight >= currentLeft && innerRight <= currentRight))
         ) {
           inner.addClass('small')
           current.addClass('small')
         }

      //  if(
      //      ((currentTop >= innerTop && currentTop <= innerBottom) || (currentBottom >= innerTop && currentBottom <= innerBottom)) &&
      //      ((currentLeft >= innerLeft && currentLeft <= innerLeft) || (currentRight >= innerLeft && currentRight <= innerRight))
      //    ) {
      //     //  inner.addClass('small')
      //      current.addClass('small')
      //    }

      }
    })
  })

  boxesStorage.addClass('show')
  // boxesStorage.each((index, item) => setTimeout(() => $(item).addClass('show'), 5 * index))
}
