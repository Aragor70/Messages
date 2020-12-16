import io from 'socket.io-client';


let socket: any;
export const initialSocket = (user: string, recipient: string) => {

    const PORT = 'localhost:3000'

    socket = io(PORT)
    
    console.log(socket)

    socket && recipient && socket.emit('join', { user, recipient }, () => {
    
    });
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