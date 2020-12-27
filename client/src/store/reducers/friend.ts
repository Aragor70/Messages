import { Delete_Invite, Get_Friends, Accept_Invite, Get_Friendships, Get_Invites, Update_Invite, Get_Unknowns, Send_Invite, Get_Sent_Invites, Cancel_Invite, Delete_Friendship } from '../actions/friend/types';

interface FriendState {
    friendships: any[],
    friends: any[],
    unknowns: any[],
    invites: any[],
    sentInvites: any[],
    loading: true | false,
    errors: any
}

export const initialState = {
    friendships: [],
    friends: [],
    unknowns: [],
    invites: [],
    sentInvites: [],
    loading: true,
    errors: {}
};

const friendReducer = (state: FriendState = initialState, action: any ): any => {
    const { type, payload } = action;

    switch(type) {
        case Get_Invites:
            return {...state, invites: payload, loading: false}
        case Get_Sent_Invites:
            return {...state, sentInvites: payload, loading: false}
        case Update_Invite:
            return {...state, invites: state.invites.map((invite: any)=> invite._id === payload.id ? payload.invite : invite), loading: false}
        case Accept_Invite:
            return {...state, invites: state.invites.filter((invite: any)=> invite._id !== payload.id), loading: false}
        case Send_Invite:
            return {...state, sentInvites: [...state.sentInvites, payload], loading: false}
        
        case Delete_Friendship:
            return {...state, unknowns: [...state.unknowns, payload.recipient], friends: state.friends.filter((friend: any)=> friend._id.toString() !== payload.id.toString()), loading: false}
        case Delete_Invite:
            return {...state, invites: state.invites.filter((invite: any)=> invite._id !== payload.id), loading: false}
        case Cancel_Invite:
            return {...state, sentInvites: state.sentInvites.filter((invite: any)=> invite.recipient._id ? invite.recipient._id != payload.id : invite.recipient.toString() != payload.id), loading: false}
        
        case Get_Friendships:
            return {...state, friendships: payload, loading: false}
        case Get_Friends:
            return {...state, friends: payload, loading: false}
        case Get_Unknowns:
            return {...state, unknowns: payload, loading: false}
        
        default:
            return state;
    }   

}
export default friendReducer;