import { TOGGLE_AUTH } from '../constants/actionTypes'

function toggle() {
  return {
    type: TOGGLE_AUTH
  }
}

export function onToggle() {
  return dispatch => dispatch(toggle())
}
