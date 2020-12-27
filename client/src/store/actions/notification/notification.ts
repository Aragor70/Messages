import { Dispatch } from "redux";
import axios from 'axios';
import { Get_From_Invite, Get_From_Service, Get_From_Messenger, Get_Notifications } from "./types";


export const getNotifications = () => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get('/api/notifications');
    
        dispatch({ type: Get_Notifications, payload: res.data });
        
    } catch (err) {
        console.log(err.message)
    }
    
}

export const getFromMessenger = () => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get('/api/notifications/messages');
    
        dispatch({ type: Get_From_Messenger, payload: res.data });
        
    } catch (err) {
        console.log(err.message)
    }
    
}
export const getFromInvite = () => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get('/api/notifications/invites');
    
        dispatch({ type: Get_From_Invite, payload: res.data });
        
    } catch (err) {
        console.log(err.message)
    }
    
}
export const getFromService = () => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get('/api/notifications/services');
    
        dispatch({ type: Get_From_Service, payload: res.data });
        
    } catch (err) {
        console.log(err.message)
    }
    
}