import { AboutReducerType, Get_About, Update_About } from "../actions/about/types"




const initialState = {
    about: {
        age: null,
        gender: null,
        status: null,
        social: {
            youtube: null,
            twitter: null,
            facebook: null,
            linkedin: null,
            instagram: null
        }
    },
    loading: true,
    errors: {}
}

const aboutReducer = (state: AboutReducerType = initialState, action: any) => {
    const { type, payload } = action;

    switch(type) {
        case Get_About:
            return { ...state, about: payload, loading: false }
        case Update_About:
            return { ...state, about: payload, loading: false }
        default:
            return state;
    }
}

export default aboutReducer;