import { TOGGLE_AUTH } from '../constants/actionTypes'

const initialState = { isLogin: true }

export default function auth(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_AUTH:
      state.isLogin = !state.isLogin
    default:
      return state
  }
}
