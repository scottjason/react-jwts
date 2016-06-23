import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const initialState = []

const store = compose(
  applyMiddleware(thunk)
)(createStore)

function config(initialState) {
  return store(rootReducer, initialState)
}

export const configStore = config

