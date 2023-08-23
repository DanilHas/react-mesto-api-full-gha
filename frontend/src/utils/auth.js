export const BASE_URL = 'https://auth.nomoreparties.co/';

const getResponseData = (response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Error: ${response.status}`);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    return getResponseData(response);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    return getResponseData(response);
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return getResponseData(response);
  });
};
