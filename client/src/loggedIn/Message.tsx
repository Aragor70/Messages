/* eslint-disable */
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { seeMessage } from '../store/actions/messenger/messenger';
import moment from 'moment';
import { deleteMessageNotification } from '../store/actions/notification/notification';

import loveMark from '../style/icons/love.png';
import seenMark from '../style/icons/seen.png';
import openedMark from '../style/icons/opened.png';
import sentMark from '../style/icons/sent.png';
import optionsBtn from '../style/icons/options.png';


const Message = ({ message, auth, setEditMode, editMode, editMessage, setEditMessage, seeMessage, deleteMessageNotification, socket, cleanMode }: any) => {
    
    const { text, date, user, recipient } = message
    
    useEffect(() => {
        if (!message.seen) {
            seeMessage(message._id, { seen: true }, socket)
        }
        
    }, [seeMessage])

    useEffect(() => {
        if (message.seen && auth.user._id === recipient._id) {
            deleteMessageNotification(message._id)
        }
        
    }, [deleteMessageNotification, message.seen])
    
    const handleOption = () => {
        if (editMode === true) {
            setEditMode(false);
            setEditMessage([]);
            cleanMode()
        } else {
            setEditMode(true);
            setEditMessage([...editMessage, message]);
        }
    }

    


    // console.log(editMessage)
    // use id of single message id={editMessage[0] && editMessage[0]._id === message._id ? editMessage[0]._id : null}
    return (
        <Fragment>
            {
                user._id === auth.user._id ? <Fragment>
                    <div className="message message-user" style={ editMessage[0] && editMessage[0]._id === message._id ? { backgroundColor: 'lightblue' } : { } }>
                        
                        <div className="msg-field" onClick={e=>handleOption()}>
                            <div className="msg-head"><span>{ Date.parse(message.date) < Date.now() - 86400000 ? moment(message.date).format('DD-MM-YYYY') : moment(message.date).format('HH:mm:SS') }</span> <span>{message.seen ? <img alt="seen" src={seenMark} style={{width: '24px', height: '24px' }} /> : message.opened ? <img alt="seen" src={openedMark} style={{width: '24px', height: '24px' }} /> : <img alt="sent" src={sentMark} style={{width: '24px', height: '24px' }} />}</span> <span>{message.liked ? <img alt="love" src={loveMark} style={{width: '24px', height: '24px' }} /> : null}</span></div>
                            <div className="text">{text}</div>
                        
                        </div>
                        {/* <div className="options" >
                            <button><img src={optionsBtn} style={{ width: '24px', height: '24px' }} /></button>
                        </div> */}
                    </div>
                </Fragment> : <Fragment>
                    <div className="message message-recipient" style={ editMessage[0] && editMessage[0]._id === message._id ? { backgroundColor: 'lightblue' } : { } } >
                            
                        <div className="msg-field" onClick={e=>handleOption()}>
                            <div className="msg-head"><span>{ Date.parse(message.date) < Date.now() - 86400000 ? moment(message.date).format('DD-MM-YYYY') : moment(message.date).format('HH:mm:SS') }</span> <span>{message.seen ? <img src={seenMark} style={{width: '24px', height: '24px' }} /> : message.opened ? <img src={openedMark} style={{width: '24px', height: '24px' }} /> : <img src={sentMark} style={{width: '24px', height: '24px' }} />}</span> <span>{message.liked ? <img src={loveMark} style={{width: '24px', height: '24px' }} /> : null}</span></div>
                            <div className="text" >{text}</div>
                        
                        </div>
                        {/* <div className="options">
                            <button ><img src={optionsBtn} style={{ width: '24px', height: '24px' }} /></button>
                        </div> */}
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}
const mapStateToProps = (state: any) => ({
    messenger: state.messenger,
    auth: state.auth
})
export default connect(mapStateToProps, { seeMessage, deleteMessageNotification })(Message);