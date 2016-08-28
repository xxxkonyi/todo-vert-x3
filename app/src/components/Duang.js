import React, { PropTypes } from 'react'
import { Grid, Cell, Button } from 'react-mdl'

const Duang = ({ message, counter, doDuang }) => {
  return (
    <div>
      <Grid className="mdl-typography--text-center">
        <Cell col={6}>
          <h1>{message} {counter}</h1>
          <h2>{message} {counter}</h2>
          <h3>{message} {counter}</h3>
          <h4>{message} {counter}</h4>
          <h5>{message} {counter}</h5>
          <h6>{message} {counter}</h6>
          <h6>{message} {counter}</h6>
        </Cell>
        <Cell col={6}>
          <div className="mdl-typography--display-4">{message} {counter}</div>
          <div className="mdl-typography--display-3">{message} {counter}</div>
          <div className="mdl-typography--display-2">{message} {counter}</div>
          <div className="mdl-typography--display-1">{message} {counter}</div>
          <div className="mdl-typography--headline">{message} {counter}</div>
          <div className="mdl-typography--title">{message} {counter}</div>
        </Cell>
      </Grid>
      <Grid>
          <Cell col={12} className="mdl-typography--text-center">
            <Button raised accent ripple onClick={doDuang}>加印记</Button>
          </Cell>
      </Grid>
    </div>
  )
}

Duang.propTypes = {
//  duang: PropTypes.objectOf(PropTypes.shape({
//    message: PropTypes.string.isRequired,
//    counter: PropTypes.number.isRequired
//  }).isRequired).isRequired,
  message: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
  doDuang: PropTypes.func.isRequired
}

export default Duang