import axios from 'axios'
import { Dispatch } from 'redux';
import { Get_About } from './types';


export const getAbout = (id: string) => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get(`/api/abouts/${id}`);
        
        dispatch({ type: Get_About, payload: res.data });
    } catch (err: any) {
        console.log(err.message)
    }
    
}