import { Dispatch } from "redux";
import { Get_Messenger, Get_Chat, Get_Chats, Update_Message } from "./types";
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


export const updateMessage = (id: string, formData: any) => async(dispatch: Dispatch<any>) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.put(`/api/messages/${id}`, formData, config);
        console.log(res.data)
        dispatch({ type: Update_Message, payload: {id, message: res.data.message} });
        
    } catch (err) {
        console.log(err.message)
    }
    
}