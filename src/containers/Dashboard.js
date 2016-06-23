import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import styles from '../main.styl'

import * as actions from '../actions'

export default class Dashboard extends React.Component {
  constructor(props, context) {
   super(props, context)
  }
  render() {
    const { actions, auth } = this.props
    return (
      <div className={styles.wrap}>
        <Navbar actions={actions} auth={auth} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)