import { Get_Chat, Get_Messenger, Get_Chats, Like_Message, Delete_Message, Send_Message } from '../actions/messenger/types';

interface MessengerState {
    chat: any,
    chats: any[],
    messenger: any,
    messages: any[],
    loading: true | false,
    errors: any
}

export const initialState = {
    chat: {},
    chats: [],
    messenger: {},
    messages: [],
    loading: true,
    errors: {}
};

const messengerReducer = (state: MessengerState = initialState, action: any ): any => {
    const { type, payload } = action;

    switch(type) {
        case Get_Messenger:
            return {...state, messenger: payload, loading: false}
        case Get_Chat:
            return {...state, chat: payload, loading: false}
        case Get_Chats:
            return {...state, chats: payload, loading: false}
        case Like_Message:
            return {...state, chat: { messages: state.chat.messages.map((message: any) => message._id === payload.id ? {... message, liked: payload.message.liked} : message ) }, loading: false}
        case Send_Message:
            return {...state, chat: { messages: [...state.chat.messages, payload.message] }, loading: false}
        case Delete_Message:
            return {...state, chat: { messages: state.chat.messages.filter((message: any) => message._id !== payload.id )}, loading: false}
        
        default:
            return state;
    }   

}
export default messengerReducer;