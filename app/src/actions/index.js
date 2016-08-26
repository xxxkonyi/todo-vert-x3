import * as ActionTypes from '../constants/ActionTypes'

export const actionCreators = {
  doDuang(message) {
    return {
      type: ActionTypes.DO_DUANG,
      payload : message
    }
  },
  doDuang2(message) {
    return {
      type: ActionTypes.DO_DUANG,
      payload : message
    }
  }
}
