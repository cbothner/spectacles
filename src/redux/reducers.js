/**
 * @providesModule
 * @flow
 */

import { combineReducers } from 'redux'
import { isBefore, subDays } from 'date-fns'

import type { Action } from './actions'
import type { TokenState, FiltersState, SchedulesState, UiState } from './state'

const olderThanOneDay = (date: ?string): boolean =>
  date == null || isBefore(date, subDays(new Date(), 1))

function token(state: ?TokenState, action: Action): TokenState {
  if (state === undefined) {
    if (olderThanOneDay(localStorage.getItem('tokenCreatedAt'))) return null
    return localStorage.getItem('token')
  }

  switch (action.type) {
    case 'SET_TOKEN':
      if (action.token) {
        localStorage.setItem('token', action.token)
        localStorage.setItem('tokenCreatedAt', new Date())
      }
      return action.token

    case 'DELETE_TOKEN':
      localStorage.removeItem('token')
      return null

    default:
      return state
  }
}

function filtersById(state: FiltersState = {}, action: Action): FiltersState {
  switch (action.type) {
    case 'SET_FILTERS':
      return action.filters

    case 'ADD_FILTER':
      return {
        ...state,
        [action.id]: {
          id: action.id,
          basePrice: '',
          ce: false,
          color: '',
          createdAt: new Date(),
          lRatings: [],
          name: '',
          ods: [],
          spectrophotometerData: [],
          updatedAt: new Date(),
          url: '',
          vlt: 0
        }
      }

    case 'UPDATE_FILTER':
      return {
        ...state,
        [action.id]: { ...state[action.id], ...action.data }
      }

    case 'DELETE_FILTER':
      let newState = { ...state }
      delete newState[action.id]
      return newState

    default:
      return state
  }
}

function schedulesById(
  state: SchedulesState = {},
  action: Action
): SchedulesState {
  switch (action.type) {
    case 'SET_SCHEDULES':
      return action.schedules

    case 'ADD_SCHEDULE':
      return {
        ...state,
        [action.id]: {
          id: action.id,
          createdAt: new Date(),
          name: '',
          suggestions: [],
          updatedAt: new Date(),
          url: ''
        }
      }

    case 'UPDATE_SCHEDULE':
      return {
        ...state,
        [action.id]: { ...state[action.id], ...action.data }
      }

    case 'DELETE_SCHEDULE':
      let newState = { ...state }
      delete newState[action.id]
      return newState

    default:
      return state
  }
}

function ui(
  state: UiState = {
    selectedFrames: ['43', '44', '38', '38b', '53', '55', '52', '60']
  },
  action: Action
): UiState {
  switch (action.type) {
    case 'UPDATE_SELECTED_FRAMES':
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
