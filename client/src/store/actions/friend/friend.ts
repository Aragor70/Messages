import { Get_Friends, Get_Friendships, Get_Invites } from "./types";
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

export const getFriendships = () => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get('/api/friends');
    
        dispatch({ type: Get_Friendships, payload: res.data });
        
    } catch (err) {
        console.log(err.message)
    }
    
}

export const getFriends = () => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get('/api/friends/users');
    
        dispatch({ type: Get_Friends, payload: res.data });
        
    } catch (err) {
        console.log(err.message)
    }
    
}