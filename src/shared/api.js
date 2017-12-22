export default {
  get(endpoint, token = undefined) {
    let r = new Request(endpoint, {
      credentials: 'same-origin',
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
    return fetch(r).then(validate)
  },

  post(endpoint, params, token = undefined) {
    let body = JSON.stringify(params)
    let r = new Request(endpoint, {
      credentials: 'same-origin',
      method: 'POST',
      body: body,
      headers: new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    })
    return fetch(r).then(validate)
  },

  put(endpoint, params, token = undefined) {
    let body = JSON.stringify(params)
    let r = new Request(endpoint, {
      credentials: 'same-origin',
      method: 'PUT',
      body: body,
      headers: new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    })
    return fetch(r).then(validate)
  },

  delete(endpoint, token = undefined) {
    let r = new Request(endpoint, {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
    return fetch(r)
  }
}

function validate(response) {
  if (!response.ok) {
    throw new Error(`Status ${response.status}`)
  }
  return response.json()
}
