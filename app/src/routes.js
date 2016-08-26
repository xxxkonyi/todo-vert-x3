import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Home from './containers/Home'
import About from './containers/About'
import Repos from './containers/Repos'
import Repo from './containers/Repo'

module.exports = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    { path: '/about', component: About },
    {
      path: '/repos',
      component: Repos,
      childRoutes: [{
        path: '/repos/:userName/:repoName',
        component: Repo
      }]
    }
  ]
}

//module.exports = (
//  <Route path="/" component={App}>
//    <IndexRoute component={Home}/>
//    <Route path="/repos" component={Repos}>
//      <Route path="/repos/:userName/:repoName" component={Repo}/>
//    </Route>
//    <Route path="/about" component={About}/>
//  </Route>
//)
