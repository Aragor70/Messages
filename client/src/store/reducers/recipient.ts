
import { Get_About, Get_Recipient, Get_Recipients } from '../actions/recipient/types'
import { RecipientType } from '../actions/recipient/types'

interface RecipientState {
    recipient: RecipientType,
    recipients: any[],
    about: any,
    loading: true | false,
    errors: any
}

export const initialState = {
    recipient: {
        name: null,
        email: null,
        avatar: null,
        role: null
    },
    recipients: [],
    about: {},
    loading: true,
    errors: {}
};

const recipientReducer = (state: RecipientState = initialState, action: any ): any => {
    const { type, payload } = action;

    switch(type) {
        case Get_Recipient:
            return {...state, recipient: payload, loading: false}
        case Get_Recipients:
            return {...state, recipients: payload, loading: false}
        case Get_About:
            return {...state, about: payload, loading: false}
        
        default:
            return state;
    }
}
export default recipientReducer;