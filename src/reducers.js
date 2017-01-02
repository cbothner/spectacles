import { combineReducers } from 'redux'
import * as A from './actions.js'

function filtersById(state = {}, action) {
  switch (action.type) {

    case A.ADD_FILTER:
      return {
        ...state,
        [action.id]: {id: action.id},
      }

    case A.UPDATE_FILTER:
      return {
        ...state,
        [action.id]: {...state[action.id], ...action.data},
      }

    case A.DELETE_FILTER:
      let newState = {...state}
      delete newState[action.id]
      return newState

    default: return state

  }
}

function schedulesById(state = {}, action) {
  switch (action.type) {

    case A.ADD_SCHEDULE:
      return {
        ...state,
        [action.id]: {id: action.id, suggestions: []},
      }

    case A.UPDATE_SCHEDULE:
      return {
        ...state,
        [action.id]: {...state[action.id], ...action.data},
      }

    case A.DELETE_SCHEDULE:
      let newState = {...state}
      delete newState[action.id]
      return newState

    default: return state
  }
}

function ui(state = {}, action) {
  switch (action.type) {

    case A.CHANGE_SELECTED_FILTER:
      return {
      ...state,
      selectedFilter: parseInt(action.id, 10),
    }

    default: return state
  }
}

const reducer = combineReducers({
  filtersById,
  schedulesById,
  ui,
})

export default reducer
