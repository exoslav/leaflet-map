import { mapState } from './state'
import { errors, printError } from '../utils/errors'

export let loadMap = activeMap => {
  switch (activeMap.name) {
    case 'action-airtickets':
      require.ensure([], function(require, path) {
        require('../displayMaps/action-airtickets/index.js') // jaky soubor si vyzadujeme
      },
      'action-airtickets') // nazev chunku
    break
  }
}
