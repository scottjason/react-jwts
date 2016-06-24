import React from 'react'
import isEmail from 'validator/lib/isEmail'
import styles from '../styles/landing.styl'

export default class Landing extends React.Component {
  constructor(props, context) {
   super(props, context)
   this.state = { email: '', password: '' }
  }
  toggle() {
    this.props.actions.onToggle()
    this.setState({ email: '', password: '' })
    this.reset()
  }
  onChangeEmail(e) {
    this.setState({ email : e.currentTarget.value })
  }
  onChangePassword(e) {
    this.setState({ password : e.currentTarget.value })
  }
  reset() {
    document.getElementById('email').value = ''
    document.getElementById('password').value = ''
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
      var opts = {}
      opts.email = this.state.email
      opts.password = this.state.password
      this.props.actions.onLogin(opts)
    } else {
      console.log('invalid credens')
    }
  }
  onSignup() {
    if (this.isValidEmail() && this.isValidPassword()) {
      var opts = {}
      opts.email = this.state.email
      opts.password = this.state.password
      this.props.actions.onSignup(opts)
    } else {
      console.log('invalid credens')
    }
  }  
  render() {
    var btnCopy = this.props.auth.isLoginView ? 'LOGIN' : 'SIGNUP'
    var optCopy = this.props.auth.isLoginView ? 'Need an account?' : 'Have an account?'
    return (
      <div className={styles.wrap}>
        <input id='email' type='text' placeholder='Email' onChange={this.onChangeEmail.bind(this)} />
        <input id='password' type='password' placeholder='Password' onChange={this.onChangePassword.bind(this)}/>
        <button onClick={this.onSubmit.bind(this)}>{btnCopy}</button>
        <p onClick={this.toggle.bind(this)}>{optCopy}</p>
        <p>{this.props.auth.errMessage}</p>
      </div>
    )
  }
}
