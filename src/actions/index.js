import { TOGGLE_AUTH } from '../constants/actionTypes'
import { SIGNUP } from '../constants/actionTypes'
import { LOGIN } from '../constants/actionTypes'

import request from 'browser-request'

function toggle() {
  return {
    type: TOGGLE_AUTH
  }
}

function signup(data) {
  return {
    type: SIGNUP,
    data: data
  }
}

function login(data) {
  return {
    type: LOGIN,
    data: data
  }
}

export function onToggle() {
  return dispatch => dispatch(toggle())
}

export function onSignup(payload) {
  return dispatch => {
    request({ method: 'POST', url: '/signup', body: payload, json: true }, (err, res, body) => {
      dispatch(signup(body))
    })
  }
}

export function onLogin(payload) {
  return dispatch => {
    request({ method: 'POST', url: '/login', body: payload, json: true }, (err, res, body) => {
      dispatch(login(body))
    })
  }
}
