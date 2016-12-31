export const ADD_FILTER = "ADD_FILTER"
export const UPDATE_FILTER = "UPDATE_FILTER"
export const DELETE_FILTER = "DELETE_FILTER"



export function addFilter() {
  let id = Date.now()
  window.location.hash = `/filters/${id}`
  return {type: ADD_FILTER, id}
}

export function updateFilter(id, data) {
  return {type: UPDATE_FILTER, id, data}
}

export function deleteFilter(id) {
  if (!window.confirm("Are you sure you want to delete this filter?")) return {type: null}
  window.location.hash = '/filters'
  return {type: DELETE_FILTER, id}
}
