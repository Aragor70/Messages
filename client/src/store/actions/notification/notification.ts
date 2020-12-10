import { Dispatch } from "redux";
import axios from 'axios';
import { Get_Notifications } from "./types";


export const getNotifications = () => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get('/api/notifications');
    
        dispatch({ type: Get_Notifications, payload: res.data });
        
    } catch (err) {
        console.log(err.message)
    }
    
}