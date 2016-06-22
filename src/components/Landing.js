import React, { Component, PropTypes } from 'react'
import styles from '../styles/login.styl'

export default class Landing extends React.Component {
  constructor(props, context) {
   super(props, context)
   this.state = { isLogin: true }
  }
  toggle() {
    this.props.actions.onToggle()
    this.setState({ isLogin: this.props.auth.isLogin })
  }
  render() {
    var btnCopy = this.state.isLogin ? 'LOGIN' : 'SIGNUP'
    var optCopy = this.state.isLogin ? 'Need an account?' : 'Have an account?'
    return (
      <div className={styles.wrap}>
        <input type='text' placeholder='Email' />
        <input type='password' placeholder='Password' />
        <button>{btnCopy}</button>
        <p onClick={this.toggle.bind(this)}>{optCopy}</p>
      </div>
    )
  }
}
