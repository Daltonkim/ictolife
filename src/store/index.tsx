import allReducers from '../reducers'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension' // remove on deployment
import thunk from 'redux-thunk'

const loggerMiddleware = createLogger()
const persistedState = {}
const composedEnhancers = composeWithDevTools(applyMiddleware(thunk, loggerMiddleware))

export const store = createStore(allReducers, persistedState, composedEnhancers)
