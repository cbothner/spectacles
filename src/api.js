export default {
  get(endpoint) {
    let r = new Request(endpoint, {
      credentials: 'same-origin',
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
      }),
    });
    return fetch(r).then(validate);
  },

  post(endpoint, params) {
    let body = JSON.stringify(params);
    let r = new Request(endpoint, {
      credentials: 'same-origin',
      method: 'POST',
      body: body,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    return fetch(r).then(validate);
  },

  put(endpoint, params) {
    let body = JSON.stringify(params);
    let r = new Request(endpoint, {
      credentials: 'same-origin',
      method: 'PUT',
      body: body,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    return fetch(r).then(validate);
  },

  delete(endpoint) {
    let r = new Request(endpoint, {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: new Headers({
        Accept: 'application/json',
      }),
    });
    return fetch(r);
  },
};

function validate(response) {
  if (!response.ok) {
    throw new Error(`Status ${response.status}`);
  }
  return response.json();
}
