/* eslint-disable */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import Options from './reusable/Options';
import photo from '../style/photo.jpg';
import copy from 'copy-to-clipboard';
import leftArrow from '../style/icons/left-arrow2.png';

import { deleteMessage, sendMessage, likeMessage } from '../store/actions/messenger/messenger';
import io from 'socket.io-client';
import { deleteSocketMessage, getConnected, getSocketMessage } from '../store/actions/messenger/connection';
import { getFromInvite, getFromMessenger } from '../store/actions/notification/notification';
import { acceptInvite, deleteInvite, getInvites, sendInvite, updateInvite } from '../store/actions/friend/invite';
import { getFriends } from '../store/actions/friend/friend';
import MessageInvite from './MessageInvite';


let socket: any;
const Chat = ({ messenger, recipient, getConnected, friend, match, getSocketMessage, getInvites, getFromInvite, sendInvite, deleteSocketMessage, acceptInvite, deleteInvite, editMode, setEditMode, editMessage, setEditMessage, msgNavOpt, setMsgNavOpt, auth, formData, setFormData, cleanMode, likeMessage, deleteMessage, sendMessage, getFriends, getFromMessenger, updateInvite }: any) => {

    
    
    const { date, messages, users } = messenger.chat;
    
    const [isOnline, setIsOnline] = useState(false)
    const [isFriend, setIsFriend] = useState(false)
    const [isInvite, setIsInvite] = useState(false)
    const [inviteMsg, setInviteMsg] = useState<any>(false)
    const [isInvited, setIsInvited] = useState(false)
    const strollToBottom = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        if (strollToBottom.current) {
            strollToBottom.current.scrollIntoView({block: 'end', inline: "nearest"})
        }
    }, [strollToBottom, messages])

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
        socket.on('updateMessage', (msg: any) => {
            getFromMessenger()
        })
           
    }, [])
    // setIsInvite

    useEffect(() => {
        const value = friend.invites.filter((person: any) => person.user._id === match.params.id)[0]
        setIsInvite(!!value)
        setInviteMsg(value)

        return () => {
            setIsInvite(value)
        }
    }, [match.params.id, friend.invites, friend.sentInvites])

    useEffect(() => {
        const value = !!friend.sentInvites.filter((person: any) => person.recipient._id === match.params.id)[0]
        setIsInvited(value)

        return () => {
            setIsInvited(value)
        }
    }, [match.params.id, friend.invites, friend.sentInvites])


    useEffect(() => {
        const value = !!friend.friends.filter((person: any) => person._id === match.params.id)[0]
        setIsFriend(value)

        return () => {
            setIsFriend(value)
        }
    }, [match.params.id, friend.friends && friend.friends.length])

    const handleChange = ( e: any ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = ( id: string, e: any ) => {
        e.preventDefault()
        sendMessage(id, formData, socket)
    }

    
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
                                        <span><img src={leftArrow} onClick={e=> {setEditMode(!editMode), cleanMode()}} className="img35" /></span><span>quote</span><span onClick={e=> likeMessage(editMessage[0]._id, {liked: true}, socket)}>like</span><span onClick={e=> copy(editMessage[0].text)}>copy</span>
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
                    messenger.chat.messages ? messenger.chat.messages.map((msg: any) => <Message key={msg._id} socket={socket} message={msg} editMode={editMode} setEditMode={setEditMode} editMessage={editMessage} setEditMessage={setEditMessage} />) :  "Send your first message."
                }
                <div ref={strollToBottom}>
                {
                    !isFriend && isInvite && inviteMsg && <MessageInvite recipient={recipient} acceptInvite={acceptInvite} deleteInvite={deleteInvite} match={match} socket={socket} message={inviteMsg} updateInvite={updateInvite} />
                }
                {
                    !isFriend && isInvited && <div className="invite-msg"><span>Invite is pending...</span></div>
                }
                {
                    !isFriend && !isInvited && !isInvite && <div className="invite-msg"><span onClick={e=> sendInvite(match.params.id, socket)}>send invite</span></div>
                }
                </div>
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
export default connect(mapStateToProps, { likeMessage, deleteMessage, sendMessage, acceptInvite, deleteInvite, sendInvite, getConnected, getInvites, getFromInvite, getSocketMessage, deleteSocketMessage, getFriends, getFromMessenger, updateInvite })(Chat);