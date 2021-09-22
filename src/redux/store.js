// import { createStore } from 'redux'
import reducer from './reducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxPromiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
    // characters: breakingBadReducer,
    user: reducer
    // projects: projectsReducer,
    // models: modelsReducer
  })
  
  export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(reduxPromiseMiddleware))
  )

// export default createStore(reducer)