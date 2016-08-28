import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import { observableFromStore } from 'redux-rx';
import EventBus from 'vertx3-eventbus-client';

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

observableFromStore(store).subscribe(state => {
  console.debug('state changed', state)
})

const createEventBus = () => {
  const eventBus  = new EventBus('http://localhost:8082/eventbus')
  eventBus.onopen = (e) => {
    console.log('API Server opened')

    eventBus.registerHandler('axon.publisher', (err, message) => {
      console.log('received a message: ' + JSON.stringify(message))
    })

    eventBus.send('axon.sender', {
      identifier: Date.now(),
      commandName: 'send_duang',
      payload: { message: 'do send_duang' },
      metaData: { userId : 1}
    }, (nothing, rawMessage) => {
      console.log('received a reply', rawMessage)
    })

    eventBus.publish('axon.sender', {
      identifier: Date.now(),
      commandName: 'publish_duang',
      payload: { message: 'do publish_duang' },
      metaData: { userId : 1}
    })
  }
  eventBus.onclose = (e) => {
    console.log('API Server closed')
  }
}
createEventBus()

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
