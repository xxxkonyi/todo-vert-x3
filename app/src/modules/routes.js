import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './App'
import Home from './Home'
import About from './About'
import Repos from './Repos'
import Repo from './Repo'

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
