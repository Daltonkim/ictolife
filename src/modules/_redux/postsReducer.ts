import { ReduxData } from '../../data/interfaces'
import { postsConstants } from '../_constants'

const initialState: ReduxData = {
  listLoading: false,
  actionsLoading: false,
  range: [0, 20],
  error: null,
  posts: [],
  users: []
}

export const postsReducer = (state = initialState, action: { type: any; data:any }) => {
  switch (action.type) {
    case postsConstants.GET_ALL_POSTS_REQUEST:
      return {
        ...state,
        listLoading: true
      }

    case postsConstants.GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.data,
        listLoading: false
      }

    case postsConstants.GET_ALL_POSTS_FAILED:
      return {
        ...state,
        posts: state.posts?.push(action.data),
        listLoading: false

      }
    case postsConstants.ADD_POSTS_REQUEST:
      return {
        ...state,
        actionsLoading: true
      }

    case postsConstants.ADD_POSTS_SUCCESS: {
      return {
        ...state,
        posts: action.data,
        actionsLoading: false
      }
    }

    case postsConstants.ADD_POSTS_FAILED:
      return {
        ...state,
        posts: action.data,
        actionsLoading: false

      }
    case postsConstants.REMOVE_POSTS_REQUEST:
      return {
        ...state,
        actionsLoading: true
      }

    case postsConstants.REMOVE_POSTS_SUCCESS: {
      return {
        ...state,
        posts: action.data,
        actionsLoading: false
      }
    }

    case postsConstants.REMOVE_POSTS_FAILED:
      return {
        ...state,
        posts: action.data,
        actionsLoading: false
      }
    case postsConstants.SET_RANGE_REQUEST:
      return {
        ...state,
        actionsLoading: true
      }

    case postsConstants.SET_RANGE_SUCCESS: {
      return {
        ...state,
        range: action.data,
        actionsLoading: false
      }
    }

    case postsConstants.SEARCH_POSTS_FAILED:
      return {
        ...state,
        actionsLoading: false
      }
    case postsConstants.GET_USERS_REQUEST:
      return {
        ...state,
        actionsLoading: true
      }

    case postsConstants.GET_USERS_SUCCESS: {
      return {
        ...state,
        users: action.data,
        actionsLoading: false
      }
    }

    case postsConstants.GET_USERS_FAILED:
      return {
        ...state,
        actionsLoading: false
      }
    default:
      return state
  }
}
