import axios from 'axios'

const myaxios = axios.create({
  // baseURL: 'http://localhost:3000'
  baseURL: 'https://stormy-dawn-57265.herokuapp.com/'
})

export default myaxios
