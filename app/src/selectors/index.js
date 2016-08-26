import { createSelector } from 'reselect'

const getDuang = (state) => state.duang

export const doDuang = createSelector(
  [ getDuang ],
  (message) => {
    doDuang(message)
  }
)
