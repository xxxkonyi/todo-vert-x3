import React from 'react'
import NavLink from '../components/NavLink'
import { browserHistory } from 'react-router'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  handleSubmit(event) {
    event.preventDefault()
    const userName = event.target.elements[0].value
    const repoName = event.target.elements[1].value
    const path = `/repos/${userName}/${repoName}`
    console.log(path)
    browserHistory.push(path)
  },

  render() {
    return (
      <div>
        <h2>Repos</h2>
        <ul>
          <li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>
          <li><NavLink to="/repos/facebook/react">React</NavLink></li>
          <li>
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="userName"/> / {' '}
              <input type="text" placeholder="repo"/>{' '}
              <button type="submit">Go</button>
            </form>
          </li>
        </ul>
        {/* will render `Repo.js` when at /repos/:userName/:repoName */}
        {this.props.children}
      </div>
    )
  }
})
