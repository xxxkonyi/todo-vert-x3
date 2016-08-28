import './css/NavigationLayout.css'

import React, { PropTypes } from 'react'
import S from 'shorti'
import { Link } from 'react-router'
import { Layout, Header, Navigation, Content } from 'react-mdl'

// style={ S('text-center') }
const logo = 'material-icons'

const NavigationLayout = ({children}) => {
  return (
    <div>
      <Layout fixedHeader>
        <Header title={<strong>茄子印</strong>}>
          <Navigation>
            <a href="">首页</a>
            <a href="">印记</a>
          </Navigation>
        </Header>
        <Content>
          {children}
        </Content>
      </Layout>
    </div>
  )
}

NavigationLayout.propTypes = {
//  duang: PropTypes.objectOf(PropTypes.shape({
//    message: PropTypes.string.isRequired,
//    counter: PropTypes.number.isRequired
//  }).isRequired).isRequired,
//  message: PropTypes.string.isRequired,
//  counter: PropTypes.number.isRequired,
//  doDuang: PropTypes.func.isRequired
}

export default NavigationLayout