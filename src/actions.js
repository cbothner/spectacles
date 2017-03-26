export const ADD_FILTER = "ADD_FILTER"
export const UPDATE_FILTER = "UPDATE_FILTER"
export const DELETE_FILTER = "DELETE_FILTER"

export const ADD_SCHEDULE = "ADD_SCHEDULE"
export const UPDATE_SCHEDULE = "UPDATE_SCHEDULE"
export const DELETE_SCHEDULE = "DELETE_SCHEDULE"

export const CHANGE_SELECTED_FILTER = "CHANGE_SELECTED_FILTER"


export function addFilter(history) {
  let id = Date.now()
  history.replace(`/filters/${id}`)
  return {type: ADD_FILTER, id}
}

export function updateFilter(id, data) {
  return {type: UPDATE_FILTER, id, data}
}

export function deleteFilter(id, history) {
  if (!window.confirm("Are you sure you want to delete this filter?")) return {type: null}
  history.replace('/filters')
  return {type: DELETE_FILTER, id}
}

export function addSchedule(history) {
  let id = Date.now()
  history.replace(`/schedules/${id}`)
  return {type: ADD_SCHEDULE, id}
}

export function updateSchedule(id, data) {
  return {type: UPDATE_SCHEDULE, id, data}
}

export function deleteSchedule(id, history) {
  if (!window.confirm("Are you sure you want to delete this schedule?")) return {type: null}
  history.replace('/schedules')
  return {type: DELETE_SCHEDULE, id}
}

export function changeSelectedFilter(id) {
  return {type: CHANGE_SELECTED_FILTER, id}
}
