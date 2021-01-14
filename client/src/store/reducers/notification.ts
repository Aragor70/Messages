import { Get_Notifications, Get_From_Messenger, Get_From_Invite, Get_From_Service, Switch_Notification, Switch_Feedback_Notification, Switch_Messenger_Notification, Switch_Service_Notification, Switch_Invite_Notification, Delete_Message_Notification } from '../actions/notification/types';

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
        turn_on: false,
        messages: []
    },
    messenger: {
        turn_on: false,
        messages: []
    },
    invite: {
        turn_on: false,
        messages: []
    },
    feedback: {
        turn_on: false,
        messages: []
    },
    turn_on: false,
    loading: true,
    errors: {}
};

const notificationReducer = (state: NotificationState = initialState, action: any ): any => {
    const { type, payload } = action;

    switch(type) {
        case Get_Notifications:
            return {...state, messenger: {...state.messenger, turn_on: payload.messenger.turn_on}, invite: {...state.invite, turn_on: payload.invite.turn_on}, service: {...state.service, turn_on: payload.service.turn_on}, loading: false}
        case Get_From_Messenger:
            return {...state, messenger: {...state.messenger, messages: payload }, loading: false}
        case Get_From_Invite:
            return {...state, invite: {...state.invite, messages: payload }, loading: false}
        case Get_From_Service:
            return {...state, service: {...state.service, messages: payload }, loading: false}
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
        case Delete_Message_Notification:
            return {...state, messenger: {...state.messenger, messages: state.messenger.messages.filter((message: any) => message._id !== payload.id)}, loading: false}
    
        default:
            return state;
    }   

}
export default notificationReducer;