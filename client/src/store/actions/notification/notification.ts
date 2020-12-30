import { Dispatch } from "redux";
import axios from 'axios';
import { Get_From_Invite, Get_From_Service, Get_From_Messenger, Get_Notifications, Switch_Notification, Switch_Messenger_Notification, Switch_Service_Notification, Switch_Feedback_Notification, Switch_Invite_Notification } from "./types";


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

export const switchNotification = (formData: any) => async(dispatch: Dispatch<any>) => {
    const config: any = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.put('/api/notifications', formData, config);
    
        dispatch({ type: Switch_Notification, payload: res.data });
        
    } catch (err) {
        console.log(err.message)
    }
    
}
export const switchMessenger = (formData: any) => async(dispatch: Dispatch<any>) => {
    const config: any = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.put('/api/notifications', formData, config);
    
        dispatch({ type: Switch_Messenger_Notification, payload: res.data });
        
    } catch (err) {
        console.log(err.message)
    }
    
}
export const switchService = (formData: any) => async(dispatch: Dispatch<any>) => {
    const config: any = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.put('/api/notifications', formData, config);
    
        dispatch({ type: Switch_Service_Notification, payload: res.data });
        
    } catch (err) {
        console.log(err.message)
    }
    
}
export const switchFeedback = (formData: any) => async(dispatch: Dispatch<any>) => {
    const config: any = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.put('/api/notifications', formData, config);
    
        dispatch({ type: Switch_Feedback_Notification, payload: res.data });
        
    } catch (err) {
        console.log(err.message)
    }
    
}
export const switchInvite = (formData: any) => async(dispatch: Dispatch<any>) => {
    const config: any = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.put('/api/notifications', formData, config);
    
        dispatch({ type: Switch_Invite_Notification, payload: res.data });
        
    } catch (err) {
        console.log(err.message)
    }
    
}