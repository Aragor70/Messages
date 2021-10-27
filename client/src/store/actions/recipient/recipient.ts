import axios from 'axios'
import { Dispatch } from 'redux';
import { Get_Recipient, Get_Recipients } from './types';


export const getRecipient = (id: string) => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get(`/api/recipients/${id}`);
    
        dispatch({ type: Get_Recipient, payload: res.data.recipient });
    } catch (err: any) {
        console.log(err.message)
    }
    
}

export const getRecipients = () => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get('/api/recipients');
    
        dispatch({ type: Get_Recipients, payload: res.data });
        
    } catch (err: any) {
        console.log(err.message)
    }
    
}