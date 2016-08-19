export let printError = (errorSet, type, value) => {
  let text = `Vyskytla se chyba! --- ${type}: ${errorSet[type][value]}`

  if(type === 'CRITICAL') {
    renderErrorPage()
    throw new Error(text)
  }
  else
    console.log(text)
}

export let errors = {
  CRITICAL: {
    missingTilesURL: 'Není specifikována URL k mapovým podkladům.',
    cannotLoadAJAXData: 'Chyba při získávání dat přes AJAX.',
    missingDisplayMaps: 'Nejsou nefinované žádné mapy.',
    missingActiveDisplayMapOpt: 'V displayMaps chybí nastavení state - active.'
  },
  WARNING: {
    wrongMapOpts: 'Jedno nebo více z nastavení mapy bylo špatně definováno. Chybné nastavení bude odebráno z mapy.',
    duplicatedActiveDisplayMapOpt: 'V displayMaps je duplikované nastavení state - active.'
  }
}

function renderErrorPage() {
  let body = $('body')
  body.addClass('error')
  let block = $('<div/>', {
    id: 'error-page'
  })

  $('<h1/>', {
    text: 'Vyskytla se neočekávaná chyba, mapa bohužel nemůže být načtena.'
  }).appendTo(block)

  $('<img/>', {
    src: 'app/src/images/error.png'
  }).appendTo(block)

  block.appendTo(body)
}
