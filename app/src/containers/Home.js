import React, { Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap';
import { actionCreators } from '../actions'
import { connect } from 'react-redux'
import { createConnector } from 'redux-rx/react'
import { bindActionCreators } from 'redux-rx'
import { Observable } from 'rx'
//import { doDuang } from '../selectors'

const Home = ({ ...props, duang, doDuang }) => {
  return(
    <div>
      {duang.message}
      {duang.counter}
      <Button onClick={() => doDuang('do duang')}>Duang</Button>
    </div>
  )
}

Home.propTypes = {
  duang: PropTypes.objectOf(PropTypes.shape({
    message: PropTypes.string.isRequired,
    counter: PropTypes.number.isRequired
  }).isRequired).isRequired,
  doDuang: PropTypes.func.isRequired
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
