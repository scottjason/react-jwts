import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { configStore } from './stores';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Landing from './containers/Landing.js'
import Dashboard from './containers/Dashboard.js'

const store = configStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path='/' component={Landing}></Route>
        <Route path='/dashboard/:token' component={Dashboard}></Route>
      </Router>
    </div>
  </Provider>,  
  document.getElementById('root')
)