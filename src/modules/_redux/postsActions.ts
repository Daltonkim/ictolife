import * as requestFromServer from './postsCrud'
import { postsConstants } from '../_constants'
import { isEmpty } from 'lodash'
import { Post } from '../../data/interfaces'

// get all posts
export const getAllPosts = (start:number, end: number) => {
  return (dispatch: (arg0: { type: string; data?: any; error?: any; }) => void) => {
    dispatch(request({}))

    try {
      requestFromServer.getAllposts(start, end)
        .then(
          (res) => {
            const { data } = res
            dispatch(success(data))
          },
          (error) => {
            dispatch(failure(error))
          }
        )
    } catch (error) {
      dispatch(failure(error))
    }
  }

  function request (data: {}) { return { type: postsConstants.GET_ALL_POSTS_REQUEST, data } }
  function success (data: unknown) { return { type: postsConstants.GET_ALL_POSTS_SUCCESS, data } }
  function failure (error: unknown) { return { type: postsConstants.GET_ALL_POSTS_FAILED, error } }
}

// add post
export const addPost = (posts: Post) => {
  return (dispatch: (arg0: { type: string; data?: any; error?: any; }) => void) => {
    dispatch(request({}))

    try {
      if (isEmpty(posts)) {
        throw new Error('Error')
      }

      requestFromServer.addPost(posts)
        .then(
          (res) => {
            dispatch(success(res))
          },
          (error) => {
            dispatch(failure(error))
          }
        )
    } catch (error) {
      dispatch(failure(error))
    }
  }

  function request (data: {}) { return { type: postsConstants.ADD_POSTS_REQUEST, data } }
  function success (data: unknown) { return { type: postsConstants.ADD_POSTS_SUCCESS, data } }
  function failure (error: unknown) { return { type: postsConstants.ADD_POSTS_FAILED, error } }
}

// remove post
export const removePost = (posts: Post) => {
  return (dispatch: (arg0: { type: string; data?: any; error?: any; }) => void) => {
    dispatch(request({}))

    try {
      if (isEmpty(posts)) {
        throw new Error('error')
      }

      requestFromServer.removePost(posts)
        .then(
          (res) => {
            dispatch(success(res))
          },
          (error) => {
            dispatch(failure(error))
          }
        )
    } catch (error) {
      dispatch(failure(error))
    }
  }

  function request (data: {}) { return { type: postsConstants.REMOVE_POSTS_REQUEST, data } }
  function success (data: unknown) { return { type: postsConstants.REMOVE_POSTS_SUCCESS, data } }
  function failure (error: unknown) { return { type: postsConstants.REMOVE_POSTS_FAILED, error } }
}

// set start and end
// get all posts
export const setRange = (start:number, end: number) => {
  return (dispatch: (arg0: { type: string; data?: any; error?: any; }) => void) => {
    dispatch(request({}))

    try {
      requestFromServer.setRange(start, end)
        .then(
          (res) => {
            dispatch(success(res))
          },
          (error) => {
            dispatch(failure(error))
          }
        )
    } catch (error) {
      dispatch(failure(error))
    }
  }
  function request (data: {}) { return { type: postsConstants.SET_RANGE_REQUEST, data } }
  function success (data: unknown) { return { type: postsConstants.SET_RANGE_SUCCESS, data } }
  function failure (error: unknown) { return { type: postsConstants.SET_RANGE_FAILED, error } }
}

// get all posts
export const getAllUsers = () => {
  return (dispatch: (arg0: { type: string; data?: any; error?: any; }) => void) => {
    dispatch(request({}))

    try {
      requestFromServer.getAllUsers()
        .then(
          (res) => {
            const { data } = res
            dispatch(success(data))
          },
          (error) => {
            dispatch(failure(error))
          }
        )
    } catch (error) {
      dispatch(failure(error))
    }
  }

  function request (data: {}) { return { type: postsConstants.GET_USERS_REQUEST, data } }
  function success (data: unknown) { return { type: postsConstants.GET_USERS_SUCCESS, data } }
  function failure (error: unknown) { return { type: postsConstants.GET_USERS_FAILED, error } }
}
