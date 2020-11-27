import { Login_Fail, Login_Success } from '../../actions/auth/types';
import auth from '../auth';
import { initialState } from '../auth';

describe("test auth reducer", () => {
    
    
    it("return initial state when actions type is undefiend", () => {
        const action = {
            type: 'NEW_ACTION'
        }
        expect(auth(initialState, action)).toEqual(initialState);
    });

    it("log in user correctly", () => {
        
        const action = {
            type: Login_Success,
            payload: {
                user: {
                    name: 'Bambino',
                    email: 'bambino@gmail.com',
                    password: 'password',
                    avatar: 'avatar',
                    role: 'User',
                    two_factor: false
                }
            }
        }
        const expectedState = {
            user: action.payload.user,
            loading: false,
            isAuthenticated: true,
            token: null,
            errors: {}
        }
        expect(auth(initialState, action)).toEqual(expectedState);
    });

    it("failed login user correctly", () => {
        
        const action = {
            type: Login_Fail,
            payload: {
                user: null
            }
        }
        const expectedState = {
            user: action.payload.user,
            loading: false,
            isAuthenticated: false,
            token: null,
            errors: {}
        }
        expect(auth(initialState, action)).toEqual(expectedState);
    });
    
});