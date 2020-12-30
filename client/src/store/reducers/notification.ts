import { Get_Notifications, Get_From_Messenger, Get_From_Invite, Get_From_Service, Switch_Notification, Switch_Feedback_Notification, Switch_Messenger_Notification, Switch_Service_Notification, Switch_Invite_Notification } from '../actions/notification/types';

interface NotificationState {
    service: any,
    messenger: any,
    invite: any,
    feedback: any,
    turn_on: any,
    loading: true | false,
    errors: any
}

export const initialState = {
    
    service: {
        turn_on: true,
        messages: []
    },
    messenger: {
        turn_on: true,
        messages: []
    },
    invite: {
        turn_on: true,
        messages: []
    },
    feedback: {
        turn_on: true,
        messages: []
    },
    turn_on: true,
    loading: true,
    errors: {}
};

const notificationReducer = (state: NotificationState = initialState, action: any ): any => {
    const { type, payload } = action;

    switch(type) {
        case Get_Notifications:
            return {...state, notifications: payload, loading: false}
        case Get_From_Messenger:
            return {...state, messenger: { messages: payload }, loading: false}
        case Get_From_Invite:
            return {...state, invite: { messages: payload }, loading: false}
        case Get_From_Service:
            return {...state, service: { messages: payload }, loading: false}
        case Switch_Notification:
            return {...state, turn_on: !state.turn_on, loading: false}
        case Switch_Messenger_Notification:
            return {...state, messenger: {...state.messenger, turn_on: !state.messenger.turn_on}, loading: false}
        case Switch_Service_Notification:
            return {...state, service: {...state.service, turn_on: !state.service.turn_on}, loading: false}
        case Switch_Feedback_Notification:
            return {...state, feedback: {...state.feedback, turn_on: !state.feedback.turn_on}, loading: false}
        case Switch_Invite_Notification:
            return {...state, invite: {...state.invite, turn_on: !state.invite.turn_on}, loading: false}
            
    
        default:
            return state;
    }   

}
export default notificationReducer;