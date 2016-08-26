import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import { observableFromStore } from 'redux-rx';

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

observableFromStore(store).subscribe(state => {
  console.debug('state changed', state)
})

//const stateStream = storeToStateStream(store);
//stateStream
//  .distinctUntilChanged(state => !state.loggedIn && state.location === '/login')
//  .filter(state => state.loggedIn && state.location === '/login')
//  .subscribe({
//    router.transitionTo('/success');
//  });

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
