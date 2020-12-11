/* eslint-disable */
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';





const Message = ({ message, auth, setEditMode, editMode, editMessage, setEditMessage }: any) => {
    
    const { text, date, user, recipient } = message
    
    
    //const recipientUser: any = users.filter((person:any) => person._id.toString() === recipient)[0]
    
    const handleOption = () => {
        if (editMode === true) {
            setEditMode(false);
            setEditMessage([]);
        } else {
            setEditMode(true);
            setEditMessage([...editMessage, message._id]);
        }
    }
    // console.log(editMessage)

    return (
        <Fragment>
            {
                user._id === auth.user._id ? <Fragment>
                    <div className="message message-user" style={ editMessage.includes(message._id) ? { backgroundColor: 'red' } : { } }>
                        
                        <div className="msg-field">
                            <div className="msg-head"><span>time</span> <span>*</span></div>
                            <div className="text">{text}</div>
                        
                        </div>
                        <div className="options">
                            <button onClick={e=>handleOption()}>options</button>
                        </div>
                    </div>
                </Fragment> : <Fragment>
                    <div className="message message-recipient" style={ editMessage.includes(message._id) ? { backgroundColor: 'red' } : { } } >
                            
                        <div className="msg-field">
                            <div className="msg-head"><span>time</span> <span>*</span></div>
                            <div className="text">{text}</div>
                        
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