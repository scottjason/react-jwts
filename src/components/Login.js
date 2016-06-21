import React, { Component, PropTypes } from 'react'
import styles from '../styles/login.styl'

export default class Login extends React.Component {
  constructor(props, context) {
   super(props, context)
  }
  render() {
    return (
      <div className={styles.wrap}>
        <input type='text' placeholder='Email' />
        <input type='password' placeholder='Password' />
        <button>Login</button>
        <p>Need An Account?</p>
      </div>
    )
  }
}
