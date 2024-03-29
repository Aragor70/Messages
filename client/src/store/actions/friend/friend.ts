import { Get_Friends, Get_Friendships, Get_Unknowns, Delete_Friendship } from "./types";
import axios from 'axios';
import { Dispatch } from "redux";


export const getFriendships = () => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get('https://types-server.herokuapp.com/api/friends');
    
        dispatch({ type: Get_Friendships, payload: res.data });
        
    } catch (err: any) {
        console.log(err.message)
    }
    
}

export const getFriends = () => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get('https://types-server.herokuapp.com/api/friends/users');
    
        dispatch({ type: Get_Friends, payload: res.data });
        
    } catch (err: any) {
        console.log(err.message)
    }
    
}

export const getUnknowns = () => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get('https://types-server.herokuapp.com/api/friends/unknowns');
    
        dispatch({ type: Get_Unknowns, payload: res.data });
        
    } catch (err: any) {
        console.log(err.message)
    }
    
}

export const deleteFriendship = (id: string, socket: any) => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.delete(`https://types-server.herokuapp.com/api/friends/${id}`);
    
        dispatch({ type: Delete_Friendship, payload: { id, recipient: res.data.recipient } });
        socket.emit('deletefriend', id)
    } catch (err: any) {
        console.log(err.message)
    }
    
}