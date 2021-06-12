/* eslint-disable */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import Options from './reusable/Options';
import photo from '../style/photo.jpg';
import copy from 'copy-to-clipboard';
import leftArrow from '../style/icons/left-arrow2.png';
import likeBtn from '../style/icons/like.png';
import copyBtn from '../style/icons/copy.png';
import quoteBtn from '../style/icons/quote.png';
import deleteBtn from '../style/icons/remove.png';
import optionsBtn from '../style/icons/options.png';

import { deleteMessage, sendMessage, likeMessage, getChat, getChats } from '../store/actions/messenger/messenger';
import { deleteSocketMessage, getConnected, getSocketMessage } from '../store/actions/messenger/connection';
import { getFromInvite, getFromMessenger } from '../store/actions/notification/notification';
import { acceptInvite, cancelInvite, deleteInvite, getInvites, getSentInvites, sendInvite, updateInvite } from '../store/actions/friend/invite';
import { getFriends } from '../store/actions/friend/friend';
import MessageInvite from './MessageInvite';
import { getRecipient } from '../store/actions/recipient/recipient';


const Chat = ({ socket, messenger, recipient, getConnected, friend, match, getSocketMessage, getInvites, getFromInvite, sendInvite, deleteSocketMessage, acceptInvite, deleteInvite, editMode, setEditMode, editMessage, setEditMessage, msgNavOpt, setMsgNavOpt, auth, formData, setFormData, cleanMode, likeMessage, deleteMessage, sendMessage, getFriends, getFromMessenger, updateInvite, cancelInvite, getChat, getChats, isSearch, setIsSearch, writeFor, setWriteFor }: any) => {

    useEffect(() => {
        getRecipient(match.params.id)
        
    }, [getRecipient, match.params.id])


    const { date, messages, users } = messenger.chat;
    
    const [isOnline, setIsOnline] = useState(false)
    const [isFriend, setIsFriend] = useState(false)
    const [isInvite, setIsInvite] = useState(false)
    const [inviteMsg, setInviteMsg] = useState<any>(false)
    const [isInvited, setIsInvited] = useState(false)
    const [sendInviteView, setSendInviteView] = useState(false)
    const [inviteData, setInviteData] = useState({
        text: ''
    })
    const [searched, setSearched] = useState<any>([])
    
    const handleSearch = (e: any) => {

        setWriteFor(e.target.value)
    }

    useEffect(() => {
        if (writeFor.length > 0)
        setSearched(messenger.chat.messages.filter((message: any) => message.text.toLowerCase().includes(writeFor.toLowerCase())))
    }, [writeFor])
    
    const strollToBottom = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        if (strollToBottom.current) {
            strollToBottom.current.scrollIntoView({block: 'end', inline: "nearest"})
        }
    }, [strollToBottom, messages])

    
    useEffect(() => {
        setIsOnline(!!messenger.connected.filter((person:any) => person.id == match.params.id )[0])
    }, [messenger.connected])


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
        setFormData({ text: "" })
    }
    const handleInviteChange = (e: any) => {
        setInviteData({ ...inviteData, [e.target.name]: e.target.value })
    }
    const handleInviteSubmit = (e: any) => {
        e.preventDefault();
        sendInvite(match.params.id, socket, inviteData)
        setSendInviteView(false)
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
                                        <span><img src={leftArrow} onClick={e=> {setEditMode(!editMode), cleanMode()}} className="img35" /></span><span><img src={quoteBtn} style={{width: '32px', height: '32px'}} /></span><span onClick={e=> copy(editMessage[0].text)}><img src={copyBtn} style={{width: '32px', height: '32px'}} /></span><span onClick={e=> { deleteMessage(editMessage[0]._id, socket), cleanMode() }}><img src={deleteBtn} style={{width: '32px', height: '32px'}} /></span>
                                    </div>
                                </Fragment> : <Fragment>
                                    <div className="editMode">
                                        <span><img src={leftArrow} onClick={e=> {setEditMode(!editMode), cleanMode()}} className="img35" /></span><span><img src={quoteBtn} style={{width: '32px', height: '32px'}} /></span><span onClick={e=> likeMessage(editMessage[0]._id, {liked: true}, socket)}><img src={likeBtn} style={{width: '32px', height: '32px'}} /></span><span onClick={e=> copy(editMessage[0].text)}><img src={copyBtn} style={{width: '32px', height: '32px'}} /></span>
                                    </div>
                                </Fragment>
                            }
                            
                        </Fragment> : isSearch ? <Fragment>
                            <div className="editMode">
                                <span><img src={leftArrow} onClick={e=> {setEditMode(!editMode), cleanMode()}} className="img35" /></span><span className="searchMode"><input type="text" value={writeFor} onChange={e=> handleSearch(e)} placeholder=" .search message" /></span>
                            </div>




                        </Fragment> : <Fragment>
                            <div className="avatar"><img src={recipient.recipient.avatar} style={{ height:"35px", width:"35px" }} /></div><div className="messenger-recipient"><span>{recipient.recipient.name} : </span><span className="status" >{isOnline ? "online" : "offline"}</span></div>
                            <div className="options"><img onClick={e=> setMsgNavOpt(true)} src={optionsBtn} style={{width: '35px', height: '35px'}} /></div>
                        </Fragment>
                    }
                    
                </div>
                {
                    msgNavOpt && <Fragment>

                        <Options recipient={editMessage && match.params.id} user={auth.user} msgNavOpt={msgNavOpt} setMsgNavOpt={setMsgNavOpt} editMessage={editMessage} setEditMessage={setEditMessage} setIsSearch={setIsSearch} />

                    </Fragment>
                }
                <hr />
                <div className="messages-box">
                {
                    writeFor.length > 0 ? searched.map((msg: any) => <Message key={msg._id} socket={socket} message={msg} editMode={editMode} setEditMode={setEditMode} editMessage={editMessage} setEditMessage={setEditMessage} cleanMode={cleanMode} />) :
                
                    messenger.chat.messages ? messenger.chat.messages.map((msg: any) => <Message key={msg._id} socket={socket} message={msg} editMode={editMode} setEditMode={setEditMode} editMessage={editMessage} setEditMessage={setEditMessage} cleanMode={cleanMode} />) :  "Send your first message."
                }
                <div ref={strollToBottom}>
                {
                    !isFriend && isInvite && inviteMsg && <MessageInvite recipient={recipient} acceptInvite={acceptInvite} deleteInvite={deleteInvite} match={match} socket={socket} message={inviteMsg} updateInvite={updateInvite} />
                }
                {
                    !isFriend && isInvited && <div className="invite-msg"><span>Invite is pending...</span><span onClick={e=> cancelInvite(match.params.id, socket)}>Cancel</span></div>
                }
                

                {   //sendInviteView, setSendInviteView handleInviteSubmit
                    !isInvited && !isInvite && !isFriend && <Fragment>
                            <form onSubmit={e=> handleInviteSubmit(e)} className="invite-msg">
                                <h1>You can share messages only with friends.</h1>
                                <input type="text" name="text" onChange={e=> handleInviteChange(e)} placeholder="Hi, there :)" />
                                <button type="submit">Send Invite</button>
                            </form>
                        </Fragment>
            
                }
                </div>
                </div>

                {
                    isFriend ? <Fragment>
                        <form className="write-box" onSubmit={e=> handleSubmit(match.params.id, e)}>
                            <div className="write-header"></div>
                            <div className="write-input">
                                <input type="text" name="text" value={formData.text || ""} onChange={e=> handleChange(e)} />
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
export default connect(mapStateToProps, { likeMessage, deleteMessage, sendMessage, acceptInvite, deleteInvite, sendInvite, getConnected, getInvites, getFromInvite, getSocketMessage, deleteSocketMessage, getFriends, getFromMessenger, updateInvite, cancelInvite, getChat, getChats})(Chat);