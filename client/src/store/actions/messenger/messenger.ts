import { Dispatch } from "redux";
import { Get_Messenger, Get_Chat, Get_Chats, Get_Message } from "./types";
import axios from 'axios';



export const getMessenger = () => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get('/api/messages/messengers');
        
        dispatch({ type: Get_Messenger, payload: res.data });
        
    } catch (err) {
        console.log(err.message)
    }
    
}
export const getChats = () => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get('/api/messages/chats/');
        
        dispatch({ type: Get_Chats, payload: res.data });
        
    } catch (err) {
        console.log(err.message)
    }
    
}

export const getChat = (id: string) => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get(`/api/messages/chats/${id}`);
        
        dispatch({ type: Get_Chat, payload: res.data });
        
    } catch (err) {
        console.log(err.message)
    }
    
}
export const getMessage = (id: string) => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get(`/api/messages/${id}`);
        
        dispatch({ type: Get_Message, payload: res.data });
        
    } catch (err) {
        console.log(err.message)
    }
    
}