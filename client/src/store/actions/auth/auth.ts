import { AuthDispatchTypes, LoadUser, Load_User, LoginUserType, Login_Fail, Login_Success, Logout_User, RegisterUserType, Register_Fail, Register_Success } from "./types";
import { Dispatch } from 'redux';
import axios from "axios";
import { setAlert } from "../alert/alert";
import setAuthToken from "../../../utils/setAuthToken";

export const loadUser = () => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    
    try {
        const res = await axios.get('/api/auth');



        dispatch({ type: Load_User, payload: { user: res.data} });

    } catch(err) {
        dispatch({ type: Login_Fail });
    }
}


export const login = (formData: LoginUserType, history: any) => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        const res = await axios.post('/api/auth', formData);
        
        dispatch({ type: Login_Success, payload: res.data })
        
        dispatch(loadUser())

        dispatch(setAlert(res.data.message, 'success'))

        history.push('/')
        
    } catch (err) {
        dispatch({ type: Register_Fail });
        dispatch(setAlert(err.response.data.message, 'danger'))
        
    }
}

export const register = (formData: LoginUserType, history: any) => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        const res = await axios.post('/api/users', formData);
        
        console.log(res.data.message)
        dispatch({ type: Register_Success, payload: res.data })

        dispatch(loadUser())
        
        dispatch(setAlert(res.data.message, 'success'))

        history.push('/')
        
    } catch (err) {
        console.log(err.response.data.message)
        dispatch(setAlert(err.response.data.message, 'danger'))
        
    }
}

export const logout = () => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    dispatch({ type: Logout_User });
    
}