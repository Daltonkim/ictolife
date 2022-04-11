import { ReduxData } from '../../data/interfaces'
import { postsConstants } from '../_constants'

const initialState: ReduxData = {
  listLoading: false,
  actionsLoading: false,
  page: 1,
  userId: 0,
  error: null,
  posts: [],
  newPostIndex: undefined,
  users: []
}

export const postsReducer = (state = initialState, action: { type: any; data:any }) => {
  switch (action.type) {
    case postsConstants.GET_ALL_POSTS_REQUEST:
      return {
        ...state,
        listLoading: true
      }

    case postsConstants.GET_ALL_POSTS_SUCCESS: {
      const s = [...state.posts]
      return {
        ...state,
        posts: [...s, ...action.data],
        listLoading: false
      }
    }
    case postsConstants.GET_ALL_POSTS_FAILED: {
      return {
        ...state,
        listLoading: false

      }
    }

    case postsConstants.ADD_POSTS_REQUEST:
      return {
        ...state,
        actionsLoading: true
      }

    case postsConstants.ADD_POSTS_SUCCESS: {
      let arr = state.posts
      arr = arr?.concat(action.data)
      return {
        ...state,
        posts: arr,
        newPostIndex: arr.length - 1,
        actionsLoading: false
      }
    }

    case postsConstants.ADD_POSTS_FAILED:
      return {
        ...state,
        posts: action.data,
        actionsLoading: false

      }
    case postsConstants.EDIT_POSTS_REQUEST:
      return {
        ...state,
        actionsLoading: true
      }

    case postsConstants.EDIT_POSTS_SUCCESS: {
      const pay = state.posts.map(item => {
        if (item.id === action.data.id) {
          item.title = action.data.title
          item.body = action.data.body
        }
        return item
      })
      return {
        ...state,
        posts: pay,
        actionsLoading: false
      }
    }

    case postsConstants.EDIT_POSTS_FAILED:
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
      const pay = state.posts.filter(item => item.id !== action.data.id)
      return {
        ...state,
        posts: pay,
        actionsLoading: false
      }
    }

    case postsConstants.REMOVE_POSTS_FAILED:
      return {
        ...state,
        posts: action.data,
        actionsLoading: false
      }

    case postsConstants.SET_USER_REQUEST:
      return {
        ...state,
        actionsLoading: true
      }

    case postsConstants.SET_USER_SUCCESS: {
      return {
        ...state,
        userId: action.data,
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
