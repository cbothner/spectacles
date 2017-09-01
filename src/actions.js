import api from './api.js'

export const SET_TOKEN = 'SET_TOKEN'
export const DELETE_TOKEN = 'DELETE_TOKEN'

export const SET_FILTERS = 'SET_FILTERS'
export const ADD_FILTER = 'ADD_FILTER'
export const UPDATE_FILTER = 'UPDATE_FILTER'
export const DELETE_FILTER = 'DELETE_FILTER'

export const SET_SCHEDULES = 'SET_SCHEDULES'
export const ADD_SCHEDULE = 'ADD_SCHEDULE'
export const UPDATE_SCHEDULE = 'UPDATE_SCHEDULE'
export const DELETE_SCHEDULE = 'DELETE_SCHEDULE'

export function getToken({ email, password }) {
  return dispatch =>
    api
      .post('/api/admin_token.json', { auth: { email, password } })
      .then(({ jwt: token }) => {
        dispatch(setToken(token))
        dispatch(getFilters())
        dispatch(getSchedules())
        return { token }
      })
      .catch(() => dispatch(setToken(false)))
}

export function setToken(token) {
  return { type: SET_TOKEN, token }
}

export function deleteToken() {
  return { type: DELETE_TOKEN }
}

// FILTERS

export function getFilters() {
  return (dispatch, getState) =>
    api.get('/api/filters.json', getState().token).then(json => {
      if (json.filters) {
        dispatch(setFilters(json.filters))
      }
    })
}

export function getFilter(name) {
  return (dispatch, getState) =>
    api
      .get(`/api/filters/find.json?name=${name}`, getState().token)
      .then(json => {
        if (json.filter) {
          dispatch(updateFilter(json.filter.id, json.filter))
        }
      })
}

function setFilters(filters) {
  return { type: SET_FILTERS, filters }
}

export function createFilter() {
  return (dispatch, getState) =>
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

export function addFilter(id) {
  return { type: ADD_FILTER, id }
}

export function saveFilter(id, data) {
  return (dispatch, getState) => {
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

export function updateFilter(id, data) {
  return { type: UPDATE_FILTER, id, data }
}

export function deleteFilter(id, history) {
  return (dispatch, getState) => {
    if (!window.confirm('Are you sure you want to delete this filter?'))
      return { type: null }
    api.delete(`/api/filters/${id}`, getState().token).then(() => {
      history.replace('/filters')
      return dispatch({ type: DELETE_FILTER, id })
    })
  }
}

// SCHEDULES

export function getSchedules() {
  return (dispatch, getState) =>
    api.get('/api/schedules.json', getState().token).then(json => {
      if (json.schedules) {
        dispatch(setSchedules(json.schedules))
      }
    })
}

export function setSchedules(schedules) {
  return { type: SET_SCHEDULES, schedules }
}

export function createSchedule() {
  return (dispatch, getState) =>
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

export function addSchedule(id) {
  return { type: ADD_SCHEDULE, id }
}

export function saveSchedule(id, data) {
  return (dispatch, getState) => {
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

export function updateSchedule(id, data) {
  return { type: UPDATE_SCHEDULE, id, data }
}

export function deleteSchedule(id, history) {
  return (dispatch, getState) => {
    if (!window.confirm('Are you sure you want to delete this schedule?'))
      return { type: null }
    api.delete(`/api/schedules/${id}`, getState().token).then(() => {
      history.replace('/schedules')
      return dispatch({ type: DELETE_SCHEDULE, id })
    })
  }
}
