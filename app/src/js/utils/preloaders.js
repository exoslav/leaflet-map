export let initPreloader = (header, text) => {
  return $(`
    <div id="laodmap-preloader">
      PRELOADER...
      <h1>${header}</h1>
      <p>${text}</p>
    </div>
  `).appendTo('body')
}
