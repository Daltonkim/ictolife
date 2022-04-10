import { combineReducers } from 'redux'
import { postsReducer } from '../modules/_redux/postsReducer'

const allReducers = combineReducers({
  posts: postsReducer
})

export default allReducers
