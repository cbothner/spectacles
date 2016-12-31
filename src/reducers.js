import { combineReducers } from 'redux'
import { UPDATE_FILTER } from './actions.js'

function filtersById(state = {}, action) {
  switch (action.type) {

    case UPDATE_FILTER:
      return {
        ...state,
        [action.id]: {...state[action.id], ...action.data},
      }

    default: return state

  }
}

function schedulesById(state = {}, action) {
  return state
}

function ui(state = {}, action) {
  return state
}

const reducer = combineReducers({
  filtersById,
  schedulesById,
  ui,
})

export default reducer
