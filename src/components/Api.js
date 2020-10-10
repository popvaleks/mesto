export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getAllTasks() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status);
    })
  }

  getUsersCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
        debugger;
      }

      return Promise.reject(res.status);
    })
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status);
    })
  }
}
