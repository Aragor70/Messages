import { combineReducers } from 'redux';
import aboutReducer from './about';
import alertReducer from './alert'
import auth from './auth'
import friendReducer from './friend';
import recipientReducer from './recipient';
import notificationReducer from './notification';
import messengerReducer from './messenger';


const rootReducer = combineReducers({
    alert: alertReducer,
    auth,
    about: aboutReducer,
    recipient: recipientReducer,
    friend: friendReducer,
    notification: notificationReducer,
    messenger: messengerReducer
})

export default rootReducer;