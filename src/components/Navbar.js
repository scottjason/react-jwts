import React from 'react'
import styles from '../styles/dashboard.styl'

export default class Navbar extends React.Component {
  constructor(props, context) {
   super(props, context)
  }
  logout() {
    localStorage.setItem('auth.data', JSON.stringify([]))
    window.location.replace('/')    
  }
  render() {
    return (
      <nav>
        <div className={styles.logout}
             onClick={this.logout}>LOGOUT
        </div> 
      </nav>
    )
  }
}
