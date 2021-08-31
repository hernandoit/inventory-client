// apiUrl will be either the production or development url defined
// in the apiConfig.js file
import apiUrl from '../apiConfig'
import axios from 'axios'

// Create Item Request
// assume that `data` is an object with `title` and `director`
// { title: 'something', director: 'someone' }
export const createItem = (data, user) => {
  return axios({
    url: apiUrl + '/items',
    method: 'post',
    data: { item: data },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

// Index request
// no data, we will need a token
export const indexItems = (user) => {
  return axios({
    // method key sets the HTTP verb/method for this request
    // GET is the default method, so we can include or not up to us
    method: 'GET',
    url: apiUrl + '/items',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

// GET /items/:id
export const showItems = (id, user) => {
  return axios({
    url: apiUrl + '/items/' + id,
    // method is optional, default is GET
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

// DELETE /items/:id
export const deleteItem = (id, user) => {
  return axios({
    url: apiUrl + '/items/' + id,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

// PATCH /items/:id
export const updateItem = (data, id, user) => {
  return axios({
    url: apiUrl + '/items/' + id,
    method: 'patch',
    data: { item: data },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
