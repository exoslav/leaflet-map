import { mapState } from '../map/state'

export let createSwitchMapControls = () => {
  if(mapState.displayMaps.length > 1)
    console.log('cotrols will be rendered')
}
