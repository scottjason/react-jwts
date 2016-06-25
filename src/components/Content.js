import React from 'react'
import styles from '../styles/dashboard.styl'
import PanelLeft from './PanelLeft'
import PanelRight from './PanelRight'

export default class Content extends React.Component {
  constructor(props, context) {
   super(props, context)
  }
  render() {
    return (
      <div className={styles.contentWrap}>
        <PanelLeft />
          <div className={styles.innerWrap}></div>
        <PanelRight />
      </div>
    )
  }
}
