/* eslint-disable */
import React, { Fragment, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Link, withRouter } from 'react-router-dom';

import '../style/messages.css'
import photo from '../style/photo.jpg'
import Options from './reusable/Options';
import leftArrow from '../style/icons/left-arrow2.png';
import auth from '../store/reducers/auth';
import { deleteMessage, getChat, getChats, getMessenger, sendMessage } from '../store/actions/messenger/messenger';
import Chat from './Chat';
import { connectUser, disconnectUser, initialConnection } from '../store/actions/messenger/connection';
import { getFriends } from '../store/actions/friend/friend';
import { getRecipient } from '../store/actions/recipient/recipient';
import { getInvites, getSentInvites } from '../store/actions/friend/invite';



const Messenger = ({ getChat, messenger, match, getFriends, friend, recipient, getRecipient, getInvites, getSentInvites, socket }: any) => {

    const [msgNavOpt, setMsgNavOpt] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const [editMessage, setEditMessage] = useState<any>([])
    
    const [usersOnline, setUsersOnline] = useState<any>([])

    const [isSearch, setIsSearch] = useState(false)
    const [writeFor, setWriteFor] = useState<any>([])

    useEffect(() => {
        getInvites()
        getSentInvites()
        getFriends()
        getChat(match.params.id)
        return () => {
            getInvites()
            getSentInvites()
            getFriends()
            getChat(match.params.id)
        }
    }, [getChat, getFriends, getSentInvites, getInvites, match.params.id, messenger.chat && messenger.chat.messages && messenger.chat.messages.length])

   
    useEffect(()=> {
        getRecipient(match.params.id)
    }, [getRecipient, match.params.id])

    const cleanMode = () => {
        setEditMode(false)
        setEditMessage([])
        setIsSearch(false)
        setWriteFor('')
    }
    
    const [ formData, setFormData ] = useState({
        text: null
    })
    

    return (
        <Fragment>

            {
                messenger.chat ? <Chat socket={socket} recipient={recipient} friend={friend} editMode={editMode} setEditMode={setEditMode} editMessage={editMessage} setEditMessage={setEditMessage} msgNavOpt={msgNavOpt} setMsgNavOpt={setMsgNavOpt} formData={formData} setFormData={setFormData} cleanMode={cleanMode} match={match} isSearch={isSearch} setIsSearch={setIsSearch} writeFor={writeFor} setWriteFor={setWriteFor} /> : <Fragment>
                    'loading...'
                </Fragment>
            }
            
                {
                    //messenger.chats ? messenger.chats.map((id: string) => <Chat key={id} id={id} user={auth.user} setEditMod={setEditMode} editMode={editMode} />) : null
                }
                
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    auth: state.auth,
    messenger: state.messenger,
    friend: state.friend,
    recipient: state.recipient
})
export default connect(mapStateToProps, { getChats, getFriends, getChat, deleteMessage, sendMessage, connectUser, disconnectUser, initialConnection, getRecipient, getInvites, getSentInvites })(withRouter(Messenger));