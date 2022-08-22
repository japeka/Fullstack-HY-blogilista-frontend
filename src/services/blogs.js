import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  if(!newToken) {
    token = null
  } else {
    token = `bearer ${newToken}`
  } 
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const headers = {
    'Authorization': token,
    'Content-Type': 'application/json',
  }
  const response = await axios.post(baseUrl, newObject, {
    headers: headers
  })
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { 
  getAll,
  create,
  setToken 
}