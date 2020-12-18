import io from 'socket.io-client';
import { Dispatch } from 'redux';
import { Connect_User, Disconnect_User } from './types';


let socket: any;
export const initialConnection = (user: string, recipient: string, chat: string)=> (dispatch: Dispatch<any>) => {

    const PORT = 'localhost:3000'

    socket = io(PORT)

    socket && recipient && socket.emit('join', { user, recipient, chat }, () => {
        console.log('dymy')
    });
}

export const connectUser = () => (dispatch: Dispatch<any>) => {
    socket.on('broadcast', (id: string, action: string) => {
        
        if (action == 'disconnect') {
            return dispatch({ type: Disconnect_User, payload: id || socket.id })
        }
        console.log('connection')
        dispatch({ type: Connect_User, payload: id })
        
        // setServices([...services, message]) 
        // send connected user to reducer
    })
}

export const disconnectUser = (id: string) => (dispatch: Dispatch<any>) => {
    
       
        dispatch({ type: Disconnect_User, payload: id || socket.id })
        
      
    if (socket) {
        socket.disconnect()
        socket.off()
    }
    
}