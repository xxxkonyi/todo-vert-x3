import React, { PropTypes } from 'react'
import { RaisedButton } from 'material-ui'

const Duang = ({ message, counter, doDuang }) => {
  return (
    <div>
      <div>
        {message}
        {counter}
      </div>
      <RaisedButton primary={true} label="加特效加特效" onClick={doDuang}></RaisedButton>
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