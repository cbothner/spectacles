import { combineReducers } from 'redux'
import { isBefore, subDays } from 'date-fns'
import * as A from './actions.js'

const olderThanOneDay = date => isBefore(date, subDays(new Date(), 1))

function token(state, action) {
  if (state === undefined) {
    if (olderThanOneDay(localStorage.getItem('tokenCreatedAt'))) return null
    return localStorage.getItem('token')
  }

  switch (action.type) {
    case A.SET_TOKEN:
      if (action.token) {
        localStorage.setItem('token', action.token)
        localStorage.setItem('tokenCreatedAt', new Date())
      }
      return action.token

    case A.DELETE_TOKEN:
      localStorage.removeItem('token')
      return null

    default:
      return state
  }
}

function filtersById(state = {}, action) {
  switch (action.type) {
    case A.SET_FILTERS:
      return action.filters

    case A.ADD_FILTER:
      return {
        ...state,
        [action.id]: { id: action.id, name: '' }
      }

    case A.UPDATE_FILTER:
      return {
        ...state,
        [action.id]: { ...state[action.id], ...action.data }
      }

    case A.DELETE_FILTER:
      let newState = { ...state }
      delete newState[action.id]
      return newState

    default:
      return state
  }
}

function schedulesById(state = {}, action) {
  switch (action.type) {
    case A.SET_SCHEDULES:
      return action.schedules

    case A.ADD_SCHEDULE:
      return {
        ...state,
        [action.id]: { id: action.id, suggestions: [] }
      }

    case A.UPDATE_SCHEDULE:
      return {
        ...state,
        [action.id]: { ...state[action.id], ...action.data }
      }

    case A.DELETE_SCHEDULE:
      let newState = { ...state }
      delete newState[action.id]
      return newState

    default:
      return state
  }
}

function ui(
  state = { selectedFrames: ['43', '44', '38', '38b', '53', '55', '52', '60'] },
  action
) {
  switch (action.type) {
    case A.UPDATE_SELECTED_FRAMES:
      return { ...state, selectedFrames: action.selectedFrames }
    default:
      return state
  }
}

const reducer = combineReducers({
  token,
  filtersById,
  schedulesById,
  ui
})

export default reducer
