import React, { Component, PropTypes } from 'react'
import { Grid, Cell } from 'react-mdl'
import Duang from '../components/Duang'

import { actionCreators } from '../actions'

import { createConnector } from 'redux-rx/react'
import { bindActionCreators } from 'redux-rx'
import { Observable } from 'rx'
import { connect } from 'react-redux'

const Home = ({ ...props, duang, doDuang }) => {
  return(
    <Grid>
        <Cell col={12}><Duang {...duang} doDuang={() => doDuang('加印记')} /></Cell>
    </Grid>
  )
}

export default createConnector((props$, state$, dispatch$) => {

  const actionCreators$ = bindActionCreators(actionCreators, dispatch$)
  const selectedState$ = state$.map(s => s.duang)

  return Observable.combineLatest(
    props$, selectedState$, actionCreators$,
    (props, selectedState, { doDuang } ) => ({
      ...props,
      ...selectedState,
      doDuang
    }));
}, Home)
