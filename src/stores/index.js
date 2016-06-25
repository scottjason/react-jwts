import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger';
import reducer from '../reducers'

const logger = createLogger()
const initialState = []

const store = compose(
  applyMiddleware(thunk, logger)
)(createStore)

export function configStore(initialState) {
  return store(reducer, initialState)
}