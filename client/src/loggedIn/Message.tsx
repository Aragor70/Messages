import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { getMessage } from '../store/actions/messenger/messenger';




const Message = ({ message, auth, setEditMode, editMode }: any) => {
    
    const { text, date, user, recipient } = message
    
    console.log(user)
    //const recipientUser: any = users.filter((person:any) => person._id.toString() === recipient)[0]
    
    return (
        <Fragment>
            {
                user._id === auth.user._id ? <Fragment>
                    <div className="message message-user">
                        
                        <div className="msg-field">
                            <div className="msg-head"><span>time</span> <span>*</span></div>
                            <div className="text">{text}</div>
                        
                        </div>
                        <div className="options">
                            <button onClick={e=>setEditMode(!editMode)}>options</button>
                        </div>
                    </div>
                </Fragment> : <Fragment>
                    <div className="message message-recipient">
                            
                        <div className="msg-field">
                            <div className="msg-head"><span>time</span> <span>*</span></div>
                            <div className="text">{text}</div>
                        
                        </div>
                        <div className="options">
                            <button onClick={e=>setEditMode(!editMode)}>options</button>
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
export default connect(mapStateToProps, { getMessage })(Message);