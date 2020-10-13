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

  addLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    }).then(this._checkError)
      .catch(this._errorCatch)
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkError)
      .catch(this._errorCatch)
  }

  editUserInfo(userName, userAbout) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userAbout,
      })
    }).then(this._checkError)
      .catch(this._errorCatch)
  }

  editUserAvatar(userAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userAvatar
      })
    }).then(this._checkError)
      .catch(this._errorCatch)
  }

  addMyCard(nameCard, linkCard) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: nameCard,
        link: linkCard
      })
    }).then(this._checkError)
      .catch(this._errorCatch)
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkError)
      .catch(this._errorCatch)
  }
}
