import * as requestFromServer from './postsCrud'
import { postsConstants } from '../_constants'
import { isEmpty } from 'lodash'
import { Post } from '../../data/interfaces'
import { toast } from 'react-toastify'

// get all posts
export const getAllPosts = (page:number) => {
  return (dispatch: (arg0: { type: string; data?: any; error?: any; }) => void) => {
    dispatch(request({}))

    try {
      requestFromServer.getAllposts(page)
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
export const addPost = (post: Post) => {
  return (dispatch: (arg0: { type: string; data?: any; error?: any; }) => void) => {
    dispatch(request({}))

    try {
      if (isEmpty(post)) {
        throw new Error('Error')
      }

      requestFromServer.addPost(post)
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

  function request (data: {}) { return { type: postsConstants.ADD_POSTS_REQUEST, data } }
  function success (data: unknown) { return { type: postsConstants.ADD_POSTS_SUCCESS, data } }
  function failure (error: unknown) { return { type: postsConstants.ADD_POSTS_FAILED, error } }
}

// edit post
export const editPost = (post: Post) => {
  return (dispatch: (arg0: { type: string; data?: any; error?: any; }) => void) => {
    dispatch(request({}))

    try {
      if (isEmpty(post)) {
        throw new Error('Error')
      }

      requestFromServer.editPost(post)
        .then(
          (res) => {
            const { data } = res
            toast.success('edit successful')
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

  function request (data: {}) { return { type: postsConstants.EDIT_POSTS_REQUEST, data } }
  function success (data: unknown) { return { type: postsConstants.EDIT_POSTS_SUCCESS, data } }
  function failure (error: unknown) { return { type: postsConstants.EDIT_POSTS_FAILED, error } }
}

// remove post
export const removePost = (post: Post) => {
  return (dispatch: (arg0: { type: string; data?: any; error?: any; }) => void) => {
    dispatch(request({}))

    try {
      if (isEmpty(post)) {
        throw new Error('error')
      }

      requestFromServer.removePost(post)
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

export const setGlobalUser = (userId: number) => {
  return (dispatch: (arg0: { type: string; data?: any; error?: any; }) => void) => {
    dispatch(request({}))
    try {
      requestFromServer.setUser(userId)
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
  function request (data: {}) { return { type: postsConstants.SET_USER_REQUEST, data } }
  function success (data: unknown) { return { type: postsConstants.SET_USER_SUCCESS, data } }
  function failure (error: unknown) { return { type: postsConstants.SET_USER_FAILED, error } }
}
