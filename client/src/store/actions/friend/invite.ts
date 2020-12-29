import { Delete_Invite, Get_Invites, Send_Invite, Update_Invite, Get_Sent_Invites, Cancel_Invite, Accept_Invite } from "./types";
import axios from 'axios';
import { Dispatch } from "redux";



export const getInvites = () => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get('/api/invites');
    
        dispatch({ type: Get_Invites, payload: res.data });
        
    } catch (err) {
        console.log(err.message)
    }
    
}

export const getSentInvites = () => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get('/api/invites/sent');
    
        dispatch({ type: Get_Sent_Invites, payload: res.data });
        
    } catch (err) {
        console.log(err.message)
    }
    
}


export const updateInvite = (id: string, formData: any) => async(dispatch: Dispatch<any>) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.put(`/api/invites/${id}`, formData, config);
        
        dispatch({ type: Update_Invite, payload: {id, invite: res.data.invite } });
        
    } catch (err) {
        console.log(err.message)
    }
    
}

export const acceptInvite = (id: string, formData: any) => async(dispatch: Dispatch<any>) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.put(`/api/invites/${id}`, formData, config);
        
        dispatch({ type: Accept_Invite, payload: {id, invite: res.data.invite } });
        
    } catch (err) {
        console.log(err.message)
    }
    
}

export const deleteInvite = (id: string, socket: any) => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.delete(`/api/invites/${id}`);
    
        dispatch({ type: Delete_Invite, payload: {id, invite: res.data} });
        socket.emit('deleteinvite', { formData: id })
        
    } catch (err) {
        console.log(err.message)
    }
    
}

export const cancelInvite = (id: string, socket: any) => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.delete(`/api/invites/${id}`);
    
        dispatch({ type: Cancel_Invite, payload: {id, invite: res.data.invite} });
        socket.emit('deleteinvite', { formData: id })
        
    } catch (err) {
        console.log(err.message)
    }
    
}

export const sendInvite = (id: string, socket: any) => async(dispatch: Dispatch<any>) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/invites/${id}`, { text: '' }, config);
    
        socket.emit('invite', { invite: res.data.invite })
        dispatch({ type: Send_Invite, payload: res.data.invite });
        
    } catch (err) {
        console.log(err.message)
    }
    
}

