import React from 'react'
import isEmail from 'validator/lib/isEmail'
import { connect } from 'react-redux'
import styles from '../styles/landing.styl'
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'

export default class Auth extends React.Component {
  constructor(props, context) {
   super(props, context)
   this.state = { email: '', password: '' }
  }
  componentDidMount() {
    this.context.store.subscribe(this.onDispatch.bind(this))
  }
  onDispatch() {
    if (!this.isDashboard()) {
      this.setState(this.state) 
    }
  }
  isDashboard() {
    return (window.location.pathname || window.location.href).indexOf('dashboard') > -1
  }
  onChangeEmail(e) {
    this.setState({ email : e.currentTarget.value })
  }
  onChangePassword(e) {
    this.setState({ password : e.currentTarget.value })
  }
  toggle() {
    this.props.actions.onToggle()
    this.setState({ email: '', password: '' })
    this.reset()
  }  
  reset() {
    document.getElementById('email').value = ''
    document.getElementById('password').value = ''
    this.props.auth.errMessage = ''
  }
  isValidEmail() {
    return isEmail(this.state.email)
  }
  isValidPassword() {
    return this.state.password.length > 3
  }
  onSubmit() {
    this.props.auth.isLoginView ? this.onLogin() : this.onSignup()
  }
  onLogin() {
    if (this.isValidEmail() && this.isValidPassword()) {
      let opts = {}
      opts.email = this.state.email
      opts.password = this.state.password
      this.props.actions.onLogin(opts)
    } else {
      this.props.auth.errMessage = 'invalid credentials'
      this.setState(this.state)
    }
  }
  onSignup() {
    if (this.isValidEmail() && this.isValidPassword()) {
      let opts = {}
      opts.email = this.state.email
      opts.password = this.state.password
      this.props.actions.onSignup(opts)
    } else {
      this.props.auth.errMessage = 'invalid credentials'
      this.setState(this.state)
    }
  }
  render() {
    let btnCopy = this.props.auth.isLoginView ? 'LOGIN' : 'SIGNUP'
    let optCopy = this.props.auth.isLoginView ? 'Need an account?' : 'Have an account?'
    return (
      <div className={styles.wrap}>
        <input id='email' type='text' placeholder='Email' onChange={this.onChangeEmail.bind(this)} />
        <input id='password' type='password' placeholder='Password' onChange={this.onChangePassword.bind(this)}/>
        <button onClick={this.onSubmit.bind(this)}>{btnCopy}</button>
        <p onClick={this.toggle.bind(this)}>{optCopy}</p>
        <div className={styles.errMessage}>{this.props.auth.errMessage}</div>
      </div>
    )
  }
}

Auth.contextTypes = {
  store:React.PropTypes.object
}