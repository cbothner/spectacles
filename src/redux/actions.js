/**
 * @flow
 */

/* eslint-disable no-use-before-define */

import api from 'shared/api'

import type { RouterHistory } from 'react-router-dom'

import type {
  State,
  FiltersState,
  SchedulesState,
  Filter,
  Schedule,
  Key
} from './state'

export type Action =
  | SetTokenAction
  | DeleteTokenAction
  | SetFiltersAction
  | AddFilterAction
  | UpdateFilterAction
  | DeleteFilterAction
  | SetSchedulesAction
  | AddScheduleAction
  | UpdateScheduleAction
  | DeleteScheduleAction
  | UpdateSelectedFramesAction

type GetState = () => State
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any
export type Dispatch = (
  action: Action | ThunkAction | Array<Action>
) => Promise<any>

export function getToken({
  email,
  password
}: {
  email: string,
  password: string
}): ThunkAction {
  return (dispatch: Dispatch) =>
    api
      .post('/api/admin_token.json', { auth: { email, password } })
      .then(({ jwt: token }) => {
        dispatch(setToken(token))
        dispatch(getFilters())
        dispatch(getSchedules())
        return { token }
      })
      .catch(() => dispatch(setToken(null)))
}

export type SetTokenAction = { type: 'SET_TOKEN', token: ?string }
export function setToken(token: ?string): SetTokenAction {
  return { type: 'SET_TOKEN', token }
}

export type DeleteTokenAction = { type: 'DELETE_TOKEN' }
export function deleteToken(): DeleteTokenAction {
  return { type: 'DELETE_TOKEN' }
}

// FILTERS

export function getFilters(): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) =>
    api.get('/api/filters.json', getState().token).then(json => {
      if (json.filters) {
        dispatch(setFilters(json.filters))
      }
    })
}

export function getFilter(name: string): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) =>
    api
      .get(`/api/filters/find.json?name=${name}`, getState().token)
      .then(json => {
        if (json.filter) {
          dispatch(updateFilter(json.filter.id, json.filter))
        }
      })
}

export type SetFiltersAction = { type: 'SET_FILTERS', filters: FiltersState }
function setFilters(filters: FiltersState): SetFiltersAction {
  return { type: 'SET_FILTERS', filters }
}

export function createFilter(): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) =>
    api
      .post(
        '/api/filters.json',
        {
          filter: { name: '' }
        },
        getState().token
      )
      .then(json => {
        dispatch(addFilter(json.filter.id))
        return json.filter.id
      })
}

export type AddFilterAction = { type: 'ADD_FILTER', id: Key }
export function addFilter(id: Key): AddFilterAction {
  return { type: 'ADD_FILTER', id }
}

export function saveFilter(id: Key, data: Filter): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    const {
      name,
      ce,
      basePrice,
      color,
      vlt,
      spectrophotometerData,
      lRatings,
      ods
    } = data
    api.put(
      `/api/filters/${id}.json`,
      {
        filter: {
          name,
          ce,
          basePrice,
          color,
          vlt,
          spectrophotometerData: spectrophotometerData,
          lRatings: lRatings,
          ods: ods
        }
      },
      getState().token
    )
  }
}

export type UpdateFilterAction = {
  type: 'UPDATE_FILTER',
  id: Key,
  data: $Shape<Filter>
}
export function updateFilter(
  id: Key,
  data: $Shape<Filter>
): UpdateFilterAction {
  return { type: 'UPDATE_FILTER', id, data }
}

export type DeleteFilterAction = {
  type: 'DELETE_FILTER',
  id: Key
}
export function deleteFilter(id: Key, history: RouterHistory): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    if (!window.confirm('Are you sure you want to delete this filter?'))
      return { type: null }
    api.delete(`/api/filters/${id}`, getState().token).then(() => {
      history.replace('/filters')
      return dispatch({ type: 'DELETE_FILTER', id })
    })
  }
}

// SCHEDULES

export function getSchedules(): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) =>
    api.get('/api/schedules.json', getState().token).then(json => {
      if (json.schedules) {
        dispatch(setSchedules(json.schedules))
      }
    })
}

export type SetSchedulesAction = {
  type: 'SET_SCHEDULES',
  schedules: SchedulesState
}
export function setSchedules(schedules: SchedulesState): SetSchedulesAction {
  return { type: 'SET_SCHEDULES', schedules }
}

export function createSchedule(): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) =>
    api
      .post(
        '/api/schedules.json',
        {
          schedule: { name: '' }
        },
        getState().token
      )
      .then(json => {
        dispatch(addSchedule(json.schedule.id))
        return json.schedule.id
      })
}

export type AddScheduleAction = { type: 'ADD_SCHEDULE', id: Key }
export function addSchedule(id: Key): AddScheduleAction {
  return { type: 'ADD_SCHEDULE', id }
}

export function saveSchedule(id: Key, data: Schedule): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    const { name, suggestions } = data
    api.put(
      `/api/schedules/${id}.json`,
      {
        schedule: {
          name,
          suggestions
        }
      },
      getState().token
    )
  }
}

export type UpdateScheduleAction = {
  type: 'UPDATE_SCHEDULE',
  id: Key,
  data: $Shape<Schedule>
}
export function updateSchedule(
  id: Key,
  data: $Shape<Schedule>
): UpdateScheduleAction {
  return { type: 'UPDATE_SCHEDULE', id, data }
}

export type DeleteScheduleAction = {
  type: 'DELETE_SCHEDULE',
  id: Key
}
export function deleteSchedule(id: Key, history: RouterHistory): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    if (!window.confirm('Are you sure you want to delete this schedule?'))
      return { type: null }
    api.delete(`/api/schedules/${id}`, getState().token).then(() => {
      history.replace('/schedules')
      return dispatch({ type: 'DELETE_SCHEDULE', id })
    })
  }
}

// FRAMES

export function getAvailableFrames(id: Key): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) =>
    api
      .get(`/api/filters/${id}/frames.json`, getState().token)
      .then(availableFrames => dispatch(updateFilter(id, { availableFrames })))
}

export type UpdateSelectedFramesAction = {
  type: 'UPDATE_SELECTED_FRAMES',
  selectedFrames: string[]
}
export function updateSelectedFrames(
  selectedFrames: string[]
): UpdateSelectedFramesAction {
  return { type: 'UPDATE_SELECTED_FRAMES', selectedFrames }
}
