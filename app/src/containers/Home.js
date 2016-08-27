import React, { Component, PropTypes } from 'react'
import Duang from '../components/Duang'

import { actionCreators } from '../actions'

import { createConnector } from 'redux-rx/react'
import { bindActionCreators } from 'redux-rx'
import { Observable } from 'rx'
import { connect } from 'react-redux'

const Home = ({ ...props, duang, doDuang }) => {
  return(
    <div>
      <Duang {...duang} doDuang={() => doDuang('do duang')} />
    </div>
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
