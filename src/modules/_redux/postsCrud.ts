import axios from 'axios'
import { Post } from '../../data/interfaces'

export function addPost (payload: Post) {
  return axios.get(`${process.env.REACT_APP_API_URL}/posts`)
}

export function removePost (payload: Post) {
  return axios.get(`${process.env.REACT_APP_API_URL}/posts`)
}

export function getAllposts (start: number, limit: number) {
  return axios.get(`${process.env.REACT_APP_API_URL}/posts?_start=${start}&_limit=${limit}`)
}

export function setRange (start: number, limit: number) {
  console.log(start, limit)
  const arr: number[] = []
  arr.push(start, limit)
  return new Promise((resolve, reject) => {
    if (arr) {
      console.log(arr)

      const res = arr && arr?.map((item: number) => item + 20)
      console.log(res)
      resolve(res)
    } else {
      reject(new Error('error'))
    }
  })
}

export function getAllUsers () {
  return axios.get(`${process.env.REACT_APP_API_URL}/users`)
}
