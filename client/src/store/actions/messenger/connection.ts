import io from 'socket.io-client';
import { Dispatch } from 'redux';
import { Get_Connected, Disconnect_User, Send_Message, Delete_Message } from './types';

let socket: any;
export const initialConnection = (user: string, recipient: string, chat: string)=> (dispatch: Dispatch<any>) => {
    
    const PORT = 'localhost:3000/messenger'

    socket = io(PORT)

    socket && recipient && socket.emit('join', { id: user, recipient, chat }, () => {
        console.log('dymy')
    });
}

export const connectUser = () => (dispatch: Dispatch<any>) => {
    socket.on('broadcast', (data: any) => {
        console.log('connectUser', data)
        if (data.action === 'disconnect') {
            return dispatch({ type: Disconnect_User, payload: data.user })
        }
            console.log('connection')
            //dispatch({ type: Connect_User, payload: data })
        
        
    })
    
}

export const disconnectUser = () => (dispatch: Dispatch<any>) => {
    
       
        dispatch({ type: Disconnect_User, payload: socket.id })
        
      
    if (socket) {
        socket.disconnect()
        socket.off()
    }
    
}
export const getSocketMessage = (message: any) => async(dispatch: Dispatch<any>) => {
    
    

    console.log(message)
    dispatch({ type: Send_Message, payload: { message } })

}

export const deleteSocketMessage = (id: any) => async(dispatch: Dispatch<any>) => {
    
    dispatch({ type: Delete_Message, payload: { id } })

}

export const getConnected = (arry: any[]) => (dispatch: Dispatch<any>) => {
    
    dispatch({ type: Get_Connected, payload: arry })

}

export const connectOne = (client: any[]) => (dispatch: Dispatch<any>) => {
    
    dispatch({ type: Get_Connected, payload: client })

}