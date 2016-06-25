import { combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import auth from './auth'

const reducer = combineReducers({
  auth,
  routing: routerReducer
})

export default reducer
