import io from 'socket.io-client';


let socket: any;
export const initialSocket = (user: string, recipient: string, chat: string) => {

    const PORT = 'localhost:3000'

    socket = io(PORT)
    
    console.log(socket)

    socket && recipient && socket.emit('join', { user, recipient, chat }, () => {
    
    });
}

export const messagesSocket = (services: any[], setServices: any) => {
    /* socket.on('message', (message: string) => {
        setServices([...services, message])
    }) */
    socket.on('broadcast', (broadcast: string) => {
        setServices([...services, broadcast])
    })
}

export const disconnectSocket = () => {
    
    if(socket) {
        socket.disconnect()
        socket.off()
    }
}

/* export const sendMessage = (room, message) => {
  if (socket) socket.emit('chat', { message, room });
} */