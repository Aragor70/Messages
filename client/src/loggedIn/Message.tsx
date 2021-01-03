/* eslint-disable */
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { seeMessage } from '../store/actions/messenger/messenger';
import moment from 'moment';




const Message = ({ message, auth, setEditMode, editMode, editMessage, setEditMessage, socket }: any) => {
    
    const { text, date, user, recipient } = message
    
    useEffect(() => {
        if (!message.seen) {
            seeMessage(message._id, { seen: true }, socket)
        }
        
    }, [seeMessage])
    
    const handleOption = () => {
        if (editMode === true) {
            setEditMode(false);
            setEditMessage([]);
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
                    <div className="message message-user" style={ editMessage[0] && editMessage[0]._id === message._id ? { backgroundColor: 'red' } : { } }>
                        
                        <div className="msg-field">
                            <div className="msg-head"><span>{ Date.parse(message.date) < Date.now() - 86400000 ? moment(message.date).format('DD-MM-YYYY') : moment(message.date).format('HH:mm:SS') }</span> <span>{message.seen ? "seen" : message.opened ? "opened" : null}</span></div>
                            <div className="text">{text}</div>
                        
                        </div>
                        <div className="options" >
                            <button onClick={e=>handleOption()}>options</button>
                        </div>
                    </div>
                </Fragment> : <Fragment>
                    <div className="message message-recipient" style={ editMessage[0] && editMessage[0]._id === message._id ? { backgroundColor: 'red' } : { } } >
                            
                        <div className="msg-field">
                            <div className="msg-head"><span>{ Date.parse(message.date) < Date.now() - 86400000 ? moment(message.date).format('DD-MM-YYYY') : moment(message.date).format('HH:mm:SS') }</span> <span>{message.seen ? "seen" : message.opened ? "opened" : null}</span></div>
                            <div className="text" >{text}</div>
                        
                        </div>
                        <div className="options">
                            <button onClick={e=>handleOption()}>options</button>
                        </div>
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
export default connect(mapStateToProps, { })(Message);