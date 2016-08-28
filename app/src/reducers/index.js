import * as ActionTypes from '../constants/ActionTypes'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

function duang(state = { duang : { message: '未加印记', counter: 0 } }, action) {
  if (action.type === ActionTypes.DO_DUANG) {
    return { ...state, duang : { message : action.payload, counter : state.duang.counter + 1 } }
  }

  return state
}

const rootReducer = combineReducers({
  duang,
  routing
})

export default rootReducer
