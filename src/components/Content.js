import React from 'react'
import styles from '../styles/dashboard.styl'

export default class Content extends React.Component {
  constructor(props, context) {
   super(props, context)
  }
  render() {
    return (
      <div className={styles.centerWrap}></div>
    )
  }
}
