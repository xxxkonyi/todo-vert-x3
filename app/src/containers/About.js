import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

export default React.createClass({
  render() {
    return (
      <div>
        About
        <LinkContainer to={{ pathname: '/about', query: { bar: 'baz' }, hash: '#the-hash' }}>
          <Button>React-router-bootstrap</Button>
        </LinkContainer>
      </div>
    )
  }
})
