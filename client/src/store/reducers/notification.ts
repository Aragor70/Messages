import { Get_Notifications } from '../actions/notification/types';

interface NotificationState {
    notifications: any[],
    loading: true | false,
    errors: any
}

export const initialState = {
    notifications: [],
    loading: true,
    errors: {}
};

const notificationReducer = (state: NotificationState = initialState, action: any ): any => {
    const { type, payload } = action;

    switch(type) {
        case Get_Notifications:
            return {...state, notifications: payload, loading: false}
        
        default:
            return state;
    }   

}
export default notificationReducer;