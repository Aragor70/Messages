import alertReducer from '../alert';
import { initialState } from '../alert';
import { Remove_Alert, Set_Alert } from '../../actions/alert/types';

describe("test alert reducer", () => {
    
    it("return empty the initial state when actions type is undefiend", () => {
        const action = {
            type: 'NEW_ACTION',
            payload: {
                id: 1,
                message: 'ciao',
                type: 'success'
            }
        }
        expect(alertReducer(initialState, action)).toEqual({ alerts: initialState.alerts })
    });

    it("return state correcly when used type Set_Alert", () => {
        const action = {
            type: Set_Alert,
            payload: {
                id: 1,
                message: 'ciao',
                type: 'success'
            }
        }
        const expectedState = {
            id: 1,
            message: 'ciao',
            type: 'success'
        }
        expect(alertReducer(initialState, action)).toEqual({ alerts: [expectedState] })
    });

    it("return state correcly when used type Remove_Alert", () => {
        
        const setAlert = {
            type: Set_Alert,
            payload: {
                id: 1,
                message: 'ciao',
                type: 'success'
            }
        }
        const removeAlert = {
            type: Remove_Alert,
            payload: setAlert.payload.id
        }

        alertReducer(initialState, setAlert)
        expect(alertReducer(initialState, removeAlert)).toEqual({ alerts: [] })

    });


});