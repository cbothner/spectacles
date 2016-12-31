export const UPDATE_FILTER = "UPDATE_FILTER"



export function updateFilter(id, data) {
  return {type: UPDATE_FILTER, id, data}
}
