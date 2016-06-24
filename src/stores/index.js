import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'

const initialState = []

const store = compose(
  applyMiddleware(thunk)
)(createStore)

export function configStore(initialState) {
  return store(reducer, initialState)
}