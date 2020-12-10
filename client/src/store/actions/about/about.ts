

import axios from 'axios'
import { Dispatch } from 'redux';
import { setAlert } from '../alert/alert';
import { AboutDispatchTypes, AboutType, Get_About, Update_About } from './types';

export const getAboutMe = () => async(dispatch: Dispatch<AboutDispatchTypes>) => {

    const res = await axios.get('/api/abouts/');
    
    dispatch({ type: Get_About, payload: res.data });
}

export const updateAboutMe = (formData: AboutType) => async(dispatch: Dispatch<AboutDispatchTypes | any>) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/abouts', formData, config);

        dispatch({ type: Update_About, payload: res.data.about });
        
        return dispatch(setAlert('saved', 'success'))

    } catch (err) {
        console.log(err.message)
    }
}

export const updateSocial = (formData: AboutType) => async(dispatch: Dispatch<AboutDispatchTypes | any>) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('api/abouts/social', formData, config);

        dispatch({ type: Update_About, payload: res.data.about });
        
        return dispatch(setAlert('saved', 'success'))

    } catch (err) {
        console.log(err.message)
    }
}

export const deleteSocial = (value: string) => async(dispatch: Dispatch<AboutDispatchTypes | any>) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.delete(`api/abouts/social/${value}`, config);

        dispatch({ type: Update_About, payload: res.data.about });
        
        return dispatch(setAlert('saved', 'success'))

    } catch (err) {
        console.log(err.message)
    }
}