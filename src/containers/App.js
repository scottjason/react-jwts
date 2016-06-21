import React, { Component, PropTypes } from 'react'
import Login from '../components/Login'
import styles from '../main.styl'

export default class App extends React.Component {
  constructor(props, context) {
   super(props, context)
  }
  render() {
    return (
      <div className={styles.app}>
        <Login />
      </div>
    )
  }
}
