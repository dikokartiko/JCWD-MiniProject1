import apiData from "./apiData.json";

export function login() {
  return fetch(apiData.login).then((res) => res.json());
}

export function getBlog() {
  return fetch(apiData.getBlog).then((res) => res.json());
}
export function getBlogLogin() {
  return fetch(apiData.getBlogLogin).then((res) => res.json());
}

export function getCategory() {
  return fetch(apiData.getCategory).then((res) => res.json());
}

export function getPagFav() {
  return fetch(apiData.getPagFav).then((res) => res.json());
}
