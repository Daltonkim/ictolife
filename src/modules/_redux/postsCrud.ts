import axios from 'axios'
import { Post } from '../../data/interfaces'

const limit = 20

export function addPost (payload: Post) {
  return axios.post(`${process.env.REACT_APP_API_URL}/posts`, payload)
}

export function editPost (payload: Post) {
  return axios.put(`${process.env.REACT_APP_API_URL}/posts/${payload.id}`, payload)
}

export function removePost (payload: Post) {
  return new Promise((resolve, reject) => {
    if (payload) {
      resolve(payload)
    } else {
      reject(new Error('error'))
    }
  })
}

export function getAllposts (page: number) {
  return axios.get(`${process.env.REACT_APP_API_URL}/posts?_page=${page}&_limit=${limit}`)
}

export function getAllUsers () {
  let cancel
  return axios.get(`${process.env.REACT_APP_API_URL}/users`)
}

export function setUser (userId: number) {
  return new Promise((resolve, reject) => {
    if (userId) {
      resolve(userId)
    } else {
      reject(new Error('error'))
    }
  })
}
