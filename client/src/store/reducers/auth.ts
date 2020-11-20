import { AuthType, Load_User, Login_Fail, Login_Success, Logout_User, Register_Fail, Register_Success, UserType } from '../actions/auth/types'


const initialState = {
    user: {
        name: null,
        email: null,
        password: null,
        avatar: null,
        role: null,
        two_factor: null
    },
    loading: true,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    errors: {}
}


const auth = (state: AuthType = initialState, action: any) => {
    const { type, payload } = action;
    switch(type) {
        
        case Load_User:
            return {...state, user: payload.user, isAuthenticated: true, loading: false }

        case Register_Success:
        case Login_Success:
            localStorage.setItem('token', payload.token);
            return {...state, user: payload.user, ...payload, isAuthenticated: true, loading: false }
        
        case Logout_User:
        case Register_Fail:
        case Login_Fail:
            localStorage.removeItem('token');
            return {...state, user: null, token: null, isAuthenticated: false, loading: false }    
        
        default:
            return state;
    }
}

export default auth;