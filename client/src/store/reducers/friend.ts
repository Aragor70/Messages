import { Delete_Invite, Get_Friends, Get_Friendships, Get_Invites, Update_Invite } from '../actions/friend/types';

interface FriendState {
    friendships: any[],
    friends: any[],
    invites: any[],
    loading: true | false,
    errors: any
}

export const initialState = {
    friendships: [],
    friends: [],
    invites: [],
    loading: true,
    errors: {}
};

const friendReducer = (state: FriendState = initialState, action: any ): any => {
    const { type, payload } = action;

    switch(type) {
        case Get_Invites:
            return {...state, invites: payload, loading: false}
        case Update_Invite:
            return {...state, invites: state.invites.map((invite: any)=> invite._id === payload.id ? payload.invite : invite), loading: false}
        case Delete_Invite:
            return {...state, invites: state.invites.filter((invite: any)=> invite._id !== payload.id), loading: false}
        case Get_Friendships:
            return {...state, friendships: payload, loading: false}
        case Get_Friends:
            return {...state, friends: payload, loading: false}
        
        
        default:
            return state;
    }   

}
export default friendReducer;