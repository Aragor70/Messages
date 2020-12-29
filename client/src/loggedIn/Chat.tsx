/* eslint-disable */
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import Options from './reusable/Options';
import photo from '../style/photo.jpg';
import copy from 'copy-to-clipboard';
import leftArrow from '../style/icons/left-arrow2.png';

import { deleteMessage, sendMessage, updateMessage } from '../store/actions/messenger/messenger';
import io from 'socket.io-client';
import { deleteSocketMessage, getConnected, getSocketMessage } from '../store/actions/messenger/connection';
import { getFromInvite } from '../store/actions/notification/notification';
import { getInvites } from '../store/actions/friend/invite';


let socket: any;
const Chat = ({ messenger, recipient, getConnected, friend, match, getSocketMessage, getInvites, getFromInvite, deleteSocketMessage, editMode, setEditMode, editMessage, setEditMessage, msgNavOpt, setMsgNavOpt, auth, formData, setFormData, cleanMode, updateMessage, deleteMessage, sendMessage }: any) => {

    const { date, messages, users } = messenger.chat;
    
    const [isOnline, setIsOnline] = useState(false)
    const [isFriend, setIsFriend] = useState(false)
    
    useEffect(() => {

        console.log('connected now')
        socket = io("http://localhost:3000")


        socket.emit('join', {id: auth.user._id, chat: messenger.chat._id}, () => {
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
        setIsOnline(!!messenger.connected.filter((person:any) => person.id == match.params.id )[0])
    }, [messenger.connected])



    useEffect(() => {
        socket.on('chat', (msg: any) => {
            
            getSocketMessage(msg.message)
            
        })
           
    }, [])

    useEffect(() => {
        socket.on('deletemessage', (msg: any) => {
            
            deleteSocketMessage(msg)
            
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
        const value = !!friend.friends.filter((person: any) => person._id === match.params.id)[0]
        setIsFriend(value)

        return () => {
            setIsFriend(value)
        }
    }, [match.params.id])

    const handleChange = ( e: any ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = ( id: string, e: any ) => {
        e.preventDefault()
        sendMessage(id, formData, socket)
    }
    console.log(messenger.chat)

    return (
        <Fragment>
            <div className="messenger-content">
                <div className="messenger-header">
                    {
                        editMode ? <Fragment>
                            {
                                editMessage[0].user._id === auth.user._id ? <Fragment>
                                    <div className="editMode">
                                        <span><img src={leftArrow} onClick={e=> {setEditMode(!editMode), cleanMode()}} className="img35" /></span><span>quote</span><span onClick={e=> copy(editMessage[0].text)}>copy</span><span onClick={e=> { deleteMessage(editMessage[0]._id, socket), cleanMode() }}>delete</span>
                                    </div>
                                </Fragment> : <Fragment>
                                    <div className="editMode">
                                        <span><img src={leftArrow} onClick={e=> {setEditMode(!editMode), cleanMode()}} className="img35" /></span><span>quote</span><span onClick={e=> updateMessage(editMessage[0]._id, {liked: true})}>like</span><span onClick={e=> copy(editMessage[0].text)}>copy</span>
                                    </div>
                                </Fragment>
                            }
                            
                        </Fragment> : <Fragment>
                            <div className="avatar"><img src={recipient.recipient.avatar} height="35px" width="35px" /></div><div className="messenger-recipient"><span>{recipient.recipient.name} : </span><span className="status" >{isOnline ? "online" : "offline"}</span></div>
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
                    messenger.chat.messages && messenger.chat.messages.map((msg: any) => <Message key={msg._id} message={msg} editMode={editMode} setEditMode={setEditMode} editMessage={editMessage} setEditMessage={setEditMessage} />)
                }
                </div>

                {
                    isFriend ? <Fragment>
                        <form className="write-box" onSubmit={e=> handleSubmit(match.params.id, e)}>
                            <div className="write-header">header</div>
                            <div className="write-input">
                                <input type="text" name="text" onChange={e=> handleChange(e)} />
                                <button type="submit">Ok</button>
                            </div>
                        </form>
                    </Fragment> : <Fragment>
                        <div className="write-box">
                            This recipient is not friend.
                            To connect with {recipient.recipient.name}
                            Send invite now.
                        </div>
                    </Fragment>
                }
                
                
            </div>
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    messenger: state.messenger,
    auth: state.auth
})
export default connect(mapStateToProps, { updateMessage, deleteMessage, sendMessage, getConnected, getInvites, getFromInvite, getSocketMessage, deleteSocketMessage })(Chat);