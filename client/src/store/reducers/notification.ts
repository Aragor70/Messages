import { Get_Notifications, Get_From_Messenger, Get_From_Invite, Get_From_Service } from '../actions/notification/types';

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
    
        default:
            return state;
    }   

}
export default notificationReducer;