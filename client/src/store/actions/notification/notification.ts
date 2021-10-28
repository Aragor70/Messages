import { Dispatch } from "redux";
import axios from 'axios';
import { Get_From_Invite, Get_From_Service, Get_From_Messenger, Get_Notifications, Switch_Notification, Delete_Message_Notification, Switch_Messenger_Notification, Switch_Service_Notification, Switch_Feedback_Notification, Switch_Invite_Notification, Delete_Invite_Notification } from "./types";


export const getNotifications = () => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get('https://types-server.herokuapp.com/api/notifications');
    
        dispatch({ type: Get_Notifications, payload: res.data });
        
    } catch (err: any) {
        console.log(err.message)
    }
    
}

export const getFromMessenger = () => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get('https://types-server.herokuapp.com/api/notifications/messages');
    
        dispatch({ type: Get_From_Messenger, payload: res.data });
        
    } catch (err: any) {
        console.log(err.message)
    }
    
}
export const getFromInvite = () => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get('https://types-server.herokuapp.com/api/notifications/invites');
    
        dispatch({ type: Get_From_Invite, payload: res.data });
        
    } catch (err: any) {
        console.log(err.message)
    }
    
}
export const getFromService = () => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get('https://types-server.herokuapp.com/api/notifications/services');
    
        dispatch({ type: Get_From_Service, payload: res.data });
        
    } catch (err: any) {
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
        await axios.put('https://types-server.herokuapp.com/api/notifications', formData, config);
    
        dispatch({ type: Switch_Notification });
        
    } catch (err: any) {
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
        await axios.put('https://types-server.herokuapp.com/api/notifications', formData, config);
    
        dispatch({ type: Switch_Messenger_Notification });
        
    } catch (err: any) {
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
        await axios.put('https://types-server.herokuapp.com/api/notifications', formData, config);
    
        dispatch({ type: Switch_Service_Notification });
        
    } catch (err: any) {
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
        await axios.put('https://types-server.herokuapp.com/api/notifications', formData, config);
    
        dispatch({ type: Switch_Feedback_Notification });
        
    } catch (err: any) {
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
        await axios.put('https://types-server.herokuapp.com/api/notifications', formData, config);
    
        dispatch({ type: Switch_Invite_Notification });
        
    } catch (err: any) {
        console.log(err.message)
    }
    
}

export const deleteMessageNotification = (id: string) => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.delete(`https://types-server.herokuapp.com/api/notifications/messages/${id}`);
    
        dispatch({ type: Delete_Message_Notification, payload: {id, message: res.data} });

        
    } catch (err: any) {
        console.log(err.message)
    }
    
}

export const deleteInviteNotification = (id: string) => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.delete(`https://types-server.herokuapp.com/api/notifications/invites/${id}`);
    
        dispatch({ type: Delete_Invite_Notification, payload: {id, message: res.data} });

        

        
    } catch (err: any) {
        console.log(err.message)
    }
    
}