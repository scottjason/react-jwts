import { TOGGLE_AUTH } from '../constants/actionTypes'
import { SIGNUP } from '../constants/actionTypes'
import { LOGIN } from '../constants/actionTypes'
import { browserHistory } from 'react-router'
import request from 'browser-request'

function toggle() {
  return {
    type: TOGGLE_AUTH
  }
}

function login(data) {
  return {
    type: LOGIN,
    data: data
  }
}

function signup(data) {
  return {
    type: SIGNUP,
    data: data
  }
}

export function onToggle() {
  return dispatch => dispatch(toggle())
}

export function onLogin(payload) {
  return dispatch => {
    request({ method: 'POST', url: '/login', body: payload, json: true }, (err, res, body) => {
      dispatch(login(body))
      if (res.status === 200) {
        var path = '/dashboard/' + body.user.token
        browserHistory.push(path)
      }
    })
  }
}

export function onSignup(payload) {
  return dispatch => {
    request({ method: 'POST', url: '/signup', body: payload, json: true }, (err, res, body) => {
      dispatch(signup(body))
      if (res.status === 200) {
        var path = '/dashboard/' + body.user.token
        browserHistory.push(path)
      }
    })
  }
}
