import {cookie} from './../common/service/common.service.js'

export function getToken (name) {
  return cookie.get(name)
}

export function setToken (name, value, days) {
  return cookie.set(name, value, days)
}

export function removeToken (name) {
  return cookie.delete(name)
}
