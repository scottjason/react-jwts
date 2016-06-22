import { TOGGLE_AUTH } from '../constants/actionTypes'
import { SIGNUP } from '../constants/actionTypes'
import { LOGIN } from '../constants/actionTypes'

const initialState = { isLoginView: true }

export default function auth(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_AUTH:
      state.isLoginView = !state.isLoginView
      return state
      break
    case LOGIN:
    case SIGNUP:
      state.isAuthenticated = typeof action.data.user === 'object'
      state.user = state.isAuthenticated ? action.data.user : undefined
      return state
      break
    default:
      return state
  }
}
