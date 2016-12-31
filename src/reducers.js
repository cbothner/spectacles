import { combineReducers } from 'redux'
import { ADD_FILTER, UPDATE_FILTER, DELETE_FILTER } from './actions.js'

function filtersById(state = {}, action) {
  switch (action.type) {

    case ADD_FILTER:
      return {
        ...state,
        [action.id]: {id: action.id},
      }

    case UPDATE_FILTER:
      return {
        ...state,
        [action.id]: {...state[action.id], ...action.data},
      }

    case DELETE_FILTER:
      let newState = {...state}
      delete newState[action.id]
      return newState

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
