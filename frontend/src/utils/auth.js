export const BASE_URL = 'https://api.mesto.project.nomoredomainsicu.ru/';

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
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    return getResponseData(response);
  });
};

export const checkToken = () => {
  return fetch(`${BASE_URL}users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return getResponseData(response);
  });
};

export const logout = () => {
  return fetch(`${BASE_URL}logout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return getResponseData(response);
  });
};
