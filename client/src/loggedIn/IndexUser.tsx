import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../style/messages.css'

import '../style/indexUser.css'

import photo from '../style/photo.jpg'
import { getChats } from '../store/actions/messenger/messenger';
import ChatPreview from './ChatPreview';
import io from 'socket.io-client';
import { deleteSocketMessage, getConnected, getSocketMessage } from '../store/actions/messenger/connection';

let socket: any;

const IndexUser = ({ auth, setMenu, menu, history, getChats, messenger, match, getConnected, deleteSocketMessage, getSocketMessage }: any) => {

    const { avatar, name, status } = auth.user
    
    useEffect(() => {
        getChats()
        return () => getChats()
    }, [getChats, messenger.chat && messenger.chat.messages && messenger.chat.messages.length])

    

    useEffect(() => {

        console.log('connected now')
        
        socket = io("http://localhost:3000")


        socket.emit('join', {id: auth.user._id}, () => {
            console.log('Socket client logged in')
        })

        socket.on('success', (success: any) => console.log(success))
        
        console.log('logged in')

        return () => {
            socket.disconnect()
            socket.off()


            console.log('disconnected now')
        }

    }, [match.params.id])

    useEffect(() => {
        
        socket.on('userlist', (users: any[]) => getConnected(users))

        socket.on('welcome', (users: any[]) => getConnected(users))
        
        
        
        return () => {

            socket.on('welcome', (users: any[]) => getConnected(users))


            socket.on('userlist', (users: any[]) => getConnected(users))

        }
    }, [messenger.connected])
    
    useEffect(() => {
        socket.on('chat', (msg: any) => {
            
            getChats()
        })
           
    }, [])

    useEffect(() => {
        socket.on('deletemessage', (msg: any) => {
            
            getChats()
            
        })
           
    }, [])

    return (
        <Fragment>
            <div className="messages-content">
            <div className="messages-box">
                {
                    messenger.chats ? messenger.chats.map((chat: any) => <ChatPreview key={chat._id} chat={chat} user={auth.user}  />) : null
                }
                
            </div>
            </div>
        </Fragment>
    );
}
const mapStateToProps = (state:any) => ({
    auth: state.auth,
    messenger: state.messenger
})
export default connect(mapStateToProps, { getChats, getConnected, deleteSocketMessage, getSocketMessage })(withRouter(IndexUser));