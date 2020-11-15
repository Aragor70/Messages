import { combineReducers } from 'redux';
import alertReducer from './alert'
import auth from './auth'


const rootReducer = combineReducers({
    alert: alertReducer,
    auth
})

export default rootReducer;