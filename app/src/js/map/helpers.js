import { errors, printError } from '../utils/errors'

export let runCustomFunctions = functions => {
  if(typeof functions === 'object' && Object.keys(functions).length !== 0)
    Object.keys(functions).forEach(key => {
      if(typeof functions[key] === 'function')
        functions[key]()
    })
}

export let validateMapOpts = opts => {
  Object.keys(opts).forEach(item => {
    if(opts[item] === '' || opts[item] === null || opts[item] === undefined) {
      printError(errors, 'WARNING', 'wrongMapOpts')

      delete opts[item]
    }
  })

  return opts
}
