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
import Message from './Message';
import copy from 'copy-to-clipboard';

import queryString from 'query-string';
import io from 'socket.io-client';
import { disconnectSocket, initialSocket, messagesSocket } from '../utils/socketTools';
import Messages from './Messages';
import { connectUser, disconnectUser, initialConnection } from '../store/actions/messenger/connection';


let socket: any;

const Messenger = ({ auth, getChats, getChat, messenger, match, updateMessage, deleteMessage, sendMessage, location, connectUser, disconnectUser, initialConnection }: any) => {

    const [msgNavOpt, setMsgNavOpt] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const [editMessage, setEditMessage] = useState<any>([])
    
    const [usersOnline, setUsersOnline] = useState<any>([])


    useEffect(() => {
        return getChat(match.params.id)
    }, [getChat, match.params.id])

    const cleanMode = () => {
        setEditMode(false)
        setEditMessage([])
    }
    
    const [ formData, setFormData ] = useState({
        text: null
    })
    const handleChange = ( e: any ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = ( id: string, e: any ) => {
        e.preventDefault()
        sendMessage(id, formData)
    }

    useEffect(() => {
        if(messenger.chat) {
            
            initialConnection(auth.user._id, match.params.id, messenger.chat._id)
            connectUser()
        }
        
    
        return () => {

            disconnectUser(auth.user._id)
        }
        
    }, [messenger.chat])

    /* useEffect(() => {
        connectUser()

        return () => {

            disconnectUser()
        }
    }, [connectUser]) */

    console.log(messenger.connected)


    return (
        <Fragment>
            <div className="messenger-content">
                <div className="messenger-header">
                    {
                        editMode ? <Fragment>
                            {
                                editMessage[0].user._id === auth.user._id ? <Fragment>
                                    <div className="editMode">
                                        <span><img src={leftArrow} onClick={e=> setEditMode(!editMode)} className="img35" /></span><span>quote</span><span onClick={e=> copy(editMessage[0].text)}>copy</span><span onClick={e=> { deleteMessage(editMessage[0]._id), cleanMode() }}>delete</span>
                                    </div>
                                </Fragment> : <Fragment>
                                    <div className="editMode">
                                        <span><img src={leftArrow} onClick={e=> setEditMode(!editMode)} className="img35" /></span><span>quote</span><span onClick={e=> updateMessage(editMessage[0]._id, {liked: true})}>like</span><span onClick={e=> copy(editMessage[0].text)}>copy</span>
                                    </div>
                                </Fragment>
                            }
                            
                        </Fragment> : <Fragment>
                            <div className="avatar"><img src={photo} height="35px" width="35px" /></div><div className="messenger-recipient"><span>Bambino : </span><span className="status" >Offline</span></div>
                            <div className="options"><button onClick={e=> setMsgNavOpt(true)}>options</button></div>
                        </Fragment>
                    }
                    
                </div>
                {
                    msgNavOpt && <Fragment>

                        <Options recipient={editMessage && match.params.id} user={auth.user} msgNavOpt={msgNavOpt} setMsgNavOpt={setMsgNavOpt} editMessage={editMessage} setEditMessage={setEditMessage} />

                    </Fragment>
                }
                <hr />
                <div className="messages-box">
                {
                    messenger.chat && messenger.chat.messages && messenger.chat.messages.map((msg: any) => <Message key={msg._id} message={msg} editMode={editMode} setEditMode={setEditMode} editMessage={editMessage} setEditMessage={setEditMessage} />)
                }
                </div>
                <form className="write-box" onSubmit={e=> handleSubmit(match.params.id, e)}>
                    <div className="write-header">header</div>
                    <div className="write-input">
                        <input type="text" name="text" onChange={e=> handleChange(e)} />
                        <button type="submit">Ok</button>
                    </div>
                </form>
                
                
                
                
                {
                    //messenger.chats ? messenger.chats.map((id: string) => <Chat key={id} id={id} user={auth.user} setEditMod={setEditMode} editMode={editMode} />) : null
                }
                
                
                
            </div>
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    auth: state.auth,
    messenger: state.messenger
})
export default connect(mapStateToProps, { getChats, getChat, updateMessage, deleteMessage, sendMessage, connectUser, disconnectUser, initialConnection })(withRouter(Messenger));