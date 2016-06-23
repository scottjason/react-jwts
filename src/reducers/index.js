import { combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import auth from './auth'

const rootReducer = combineReducers({
  auth,
  routing: routerReducer
})

export default rootReducer
