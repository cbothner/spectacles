/**
 * @providesModule api
 * @flow
 */

export default {
  get(endpoint: string, token: ?string = undefined): Promise<any> {
    let r = new Request(endpoint, {
      credentials: 'same-origin',
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        ...(token == null ? {} : { Authorization: `Bearer ${token}` })
      })
    })
    return fetch(r).then(validate)
  },

  post(
    endpoint: string,
    params: Object,
    token: ?string = undefined
  ): Promise<any> {
    let body = JSON.stringify(params)
    let r = new Request(endpoint, {
      credentials: 'same-origin',
      method: 'POST',
      body: body,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      })
    })
    return fetch(r).then(validate)
  },

  put(
    endpoint: string,
    params: Object,
    token: ?string = undefined
  ): Promise<any> {
    if (token == null) return Promise.resolve()

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

  delete(endpoint: string, token: ?string = undefined): Promise<?Response> {
    if (token == null) return Promise.resolve()

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

function validate(response: any): Object {
  if (!response.ok) {
    throw new Error(`Status ${response.status}`)
  }
  return response.json()
}
