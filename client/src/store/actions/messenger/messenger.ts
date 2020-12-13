import { Dispatch } from "redux";
import { Get_Messenger, Get_Chat, Get_Chats, Like_Message, Delete_Message, Send_Message } from "./types";
import axios from 'axios';

export const sendMessage = (id: string, formData: any) => async(dispatch: Dispatch<any>) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/messages/${id}`, formData, config);
        
        dispatch({ type: Send_Message, payload: res.data });
        
    } catch (err) {
        console.log(err.message)
    }
    
}

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
        //console.log(res.data)
        switch(formData) {
            case { liked: true }:
                return dispatch({ type: Like_Message, payload: {id, message: res.data.message} });
            case { seen: true }:
                return console.log('seen')
            
            
            default:
                return null
                
        }
        
    } catch (err) {
        console.log(err.message)
    }
    
}

export const deleteMessage = (id: string) => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.delete(`/api/messages/${id}`);
    
        dispatch({ type: Delete_Message, payload: {id, message: res.data} });
        
    } catch (err) {
        console.log(err.message)
    }
    
}