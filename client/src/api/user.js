const axios = require('axios')
// const md5 = require('blueimp-md5')

export async function register(email, password) {
  const data = {
    email: email,
    // password: md5(password)
    password: password
  }
  return axios.post('/api/register', data)
    .then((res) => Promise.resolve(res.data))
    .catch((e) => console.log('Error:', e))
}

export async function login(email, password) {
  const data = {
    email: email,
    // password: md5(password)
    password: password
  }
  return axios.post('/api/login', data)
    .then((res) => Promise.resolve(res.data))
    .catch((e) => console.log('Error:', e))
}