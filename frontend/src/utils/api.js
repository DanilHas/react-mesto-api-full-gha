class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    const promise = fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._headers.authorization,
      },
    });

    return this._returnPromiseResult(promise);
  }

  getInitialCards() {
    const promise = fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._headers.authorization,
      },
    });
    return this._returnPromiseResult(promise);
  }

  _returnPromiseResult(promise) {
    return promise.then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  renderInitialData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  setUserInfo(formInputValues) {
    const promise = fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: formInputValues.name,
        about: formInputValues.about,
      }),
    });

    return this._returnPromiseResult(promise);
  }

  addNewCard(formInputValues) {
    const promise = fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: formInputValues.name,
        link: formInputValues.link,
      }),
    });

    return this._returnPromiseResult(promise);
  }

  deleteCard(id) {
    const promise = fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization,
      },
    });

    return this._returnPromiseResult(promise);
  }

  changeLikeCardStatus(cardId, likeCardStatus) {
    if (likeCardStatus) {
      const promise = fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this._headers.authorization,
        },
      });

      return this._returnPromiseResult(promise);
    } else {
      const promise = fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this._headers.authorization,
        },
      });

      return this._returnPromiseResult(promise);
    }
  }

  changeAvatar(url) {
    const promise = fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    });

    return this._returnPromiseResult(promise);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '7465e869-899f-4ef6-ae51-f5f41eae39be',
    'Content-Type': 'application/json',
  },
});

export default api;
