/* eslint-disable */
import React, { Fragment, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Link, withRouter } from 'react-router-dom';

import '../style/messages.css'
import photo from '../style/photo.jpg'
import Options from './reusable/Options';
import leftArrow from '../style/icons/left-arrow2.png';
import auth from '../store/reducers/auth';
import { deleteMessage, getChat, getChats, getMessenger, sendMessage, updateMessage } from '../store/actions/messenger/messenger';
import Chat from './Chat';
import { connectUser, disconnectUser, initialConnection } from '../store/actions/messenger/connection';
import { getFriends } from '../store/actions/friend/friend';
import { getRecipient } from '../store/actions/recipient/recipient';


let socket: any;

const Messenger = ({ getChat, messenger, match, getFriends, friend, recipient, getRecipient }: any) => {

    const [msgNavOpt, setMsgNavOpt] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const [editMessage, setEditMessage] = useState<any>([])
    
    const [usersOnline, setUsersOnline] = useState<any>([])


    useEffect(() => {
        getFriends()
        return getChat(match.params.id)
    }, [getChat, getFriends, match.params.id, messenger.chat && messenger.chat.messages && messenger.chat.messages.length])

    useEffect(()=> {
        getRecipient(match.params.id)
    }, [getRecipient, match.params.id])

    const cleanMode = () => {
        setEditMode(false)
        setEditMessage([])
    }
    
    const [ formData, setFormData ] = useState({
        text: null
    })
    

    return (
        <Fragment>

            {
                messenger.chat ? <Chat recipient={recipient} friend={friend} editMode={editMode} setEditMode={setEditMode} editMessage={editMessage} setEditMessage={setEditMessage} msgNavOpt={msgNavOpt} setMsgNavOpt={setMsgNavOpt} formData={formData} setFormData={setFormData} cleanMode={cleanMode} match={match} /> : <Fragment>
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
export default connect(mapStateToProps, { getChats, getFriends, getChat, updateMessage, deleteMessage, sendMessage, connectUser, disconnectUser, initialConnection, getRecipient })(withRouter(Messenger));