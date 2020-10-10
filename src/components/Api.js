export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  // избавимся от дублирования кода
  _checkError(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  }

  _errorCatch(err) {
    console.log(`Ошибка ${err}!`)
  }

  getAllTasks() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._headers
    }).then(this._checkError)
      .catch(this._errorCatch)
  }

  getUsersCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this._checkError)
      .catch(this._errorCatch)
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(this._checkError)
      .catch(this._errorCatch)
  }
}
