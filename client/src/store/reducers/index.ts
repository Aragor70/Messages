import { combineReducers } from 'redux';
import aboutReducer from './about';
import alertReducer from './alert'
import auth from './auth'


const rootReducer = combineReducers({
    alert: alertReducer,
    auth,
    about: aboutReducer
})

export default rootReducer;