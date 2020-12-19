import io from 'socket.io-client';
import { Dispatch } from 'redux';
import { Connect_User, Disconnect_User } from './types';


let socket: any;
export const initialConnection = (user: string, recipient: string, chat: string)=> (dispatch: Dispatch<any>) => {
    
    const PORT = 'localhost:3000'

    socket = io(PORT)

    socket && recipient && socket.emit('join', { id: user, recipient, chat }, () => {
        console.log('dymy')
    });
}

export const connectUser = () => (dispatch: Dispatch<any>) => {
    socket.on('broadcast', (data: any) => {
        
        if (data.action == 'disconnect') {
            return dispatch({ type: Disconnect_User, payload: data.user || socket.id })
        }
            console.log('connection')
            dispatch({ type: Connect_User, payload: data })
        
            
        
        // setServices([...services, message]) 
        // send connected user to reducer
    })
    //console.log(socket)
}

export const disconnectUser = (id: string) => (dispatch: Dispatch<any>) => {
    
       
        dispatch({ type: Disconnect_User, payload: id || socket.id })
        
      
    if (socket) {
        socket.disconnect()
        socket.off()
    }
    
}