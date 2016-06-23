import { TOGGLE_AUTH } from '../constants/actionTypes'
import { SIGNUP } from '../constants/actionTypes'
import { LOGIN } from '../constants/actionTypes'

const initialState = { isLoginView: true }

export default function auth(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_AUTH:
      state.isLoginView = !state.isLoginView
    case LOGIN:
    case SIGNUP:
      state.user = typeof action.data.user === 'object' ? action.data.user : undefined
      state.message = typeof action.data.message === 'string' ? action.data.message : undefined
    default:
      return state
  }
}
