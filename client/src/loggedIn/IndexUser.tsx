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
import { getInvites } from '../store/actions/friend/invite';
import { getFromInvite, getFromMessenger } from '../store/actions/notification/notification';
import { getFriends } from '../store/actions/friend/friend';

let socket: any;

const IndexUser = ({ auth, setMenu, menu, history, getChats, messenger, match, getInvites, getFromInvite, getConnected, getFromMessenger, getFriends }: any) => {

    const { avatar, name, status } = auth.user
    
    useEffect(() => {
        getChats()
        return () => getChats()
    }, [getChats])

   

    useEffect(() => {

        console.log('connected now')
        
        socket = io("http://localhost:3000")


        socket.emit('join', {id: auth.user._id}, () => {
            console.log('Socket client logged in')
        })

        socket.on('success', (success: any) => console.log(success))
        
        console.log('front socket connect')
        console.log('logged in')

        return () => {
            socket.disconnect()
            socket.off()

            console.log('front socket disconnect')
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
            getFromMessenger()
            getChats()
        })
           
    }, [])

    useEffect(() => {
        socket.on('deletemessage', (msg: any) => {
            getFromMessenger()
            getChats()
            
        })
           
    }, [])

    useEffect(() => {
        socket.on('invite', (msg: any) => {
            getFromInvite()
            getInvites()
        })
           
    }, [])
    useEffect(() => {
        socket.on('deleteinvite', (msg: any) => {
            getInvites()
            getFromInvite()
        })
    }, [])

    useEffect(() => {
        socket.on('deletefriend', (msg: any) => {
            getFriends()
            
        })
           
    }, [])

    useEffect(() => {
        socket.on('updateinvite', (msg: any) => {
            
            getFriends()
            getFromInvite()
        })
           
    }, [])

    useEffect(() => {
        socket.on('updatemessage', (msg: any) => {
            getFromMessenger()
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
export default connect(mapStateToProps, { getChats, getConnected, deleteSocketMessage, getSocketMessage, getInvites, getFromInvite, getFromMessenger, getFriends })(withRouter(IndexUser));