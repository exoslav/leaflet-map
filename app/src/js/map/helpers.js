import { errors, printError } from '../errors'

export let validateMapOpts = opts => {
  Object.keys(opts).forEach(item => {
    if(opts[item] === '' || opts[item] === null || opts[item] === undefined) {
      printError(errors, 'UNCRITICAL', 'wrongMapOpts')

      delete opts[item]
    }
  })

  return opts
}
