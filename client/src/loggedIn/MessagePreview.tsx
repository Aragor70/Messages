import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import photo from '../style/photo.jpg'


const MessagePreview = ({ message, auth, history, chat }: any) => {
    
    const { text, date, user, recipient } = message
    
    // console.log(user)
    // const recipientUser: any = users.filter((person:any) => person._id.toString() === recipient)[0]
    
    return (
        <Fragment>
            
            {
                chat && user._id === auth.user._id ? <Fragment>
                    <div className="recipient-content">
                        <div className="messenger" onClick={e=> history.push(`/messenger/${chat._id}`)}>
                            <div className="avatar"><img src={photo} height="35px" width="35px" /></div><div className="msg-head"><span>{user.name} : </span><span className="status" >Offline</span><div className="time">28.11</div></div>
                            <div className="message"><span className="text">{text}</span><span className="status">*</span></div>
                        </div>
                        
                    </div>
                </Fragment> : <Fragment>
                    <div className="recipient-content">
                        <div className="messenger" onClick={e=> history.push(`/messenger/${chat._id}`)}>
                            <div className="avatar"><img src={photo} height="35px" width="35px" /></div><div className="msg-head"><span>{user.name} : </span><span className="status" >Offline</span><div className="time">28.11</div></div>
                            <div className="message"><span className="text">{text}</span><span className="status">*</span></div>
                        </div>
                        
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}
const mapStateToProps = (state: any) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { })(withRouter(MessagePreview));