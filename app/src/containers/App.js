import React from 'react'
import NavigationLayout from '../components/Layout/NavigationLayout'
import Home from './Home'

export default React.createClass({
  render() {
  return(
    <div>
      <NavigationLayout children={this.props.children || <Home/>}/>
    </div>
    )
  }
})
