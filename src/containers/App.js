import React, { Component, PropTypes } from 'react'
import styles from '../main.styl'

export default class App extends React.Component {
  constructor(props, context) {
   super(props, context)
  }
  render() {
    return (
      <div className={styles.app}>
      </div>
    )
  }
}
