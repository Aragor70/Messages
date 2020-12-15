import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import photo from '../style/photo.jpg'
import { getNotEqual } from '../utils/getDataFromArray';


const MessagePreview = ({ message, auth, history, chat }: any) => {
    
    const { text, date, user, recipient } = message
    
    const [person, setRecipient] = useState(null)

    useEffect(() => {
        if (chat.users && auth.user) {
            
            return setRecipient(getNotEqual(chat.users, auth.user._id))
        }
    }, [])


    // const recipientUser: any = chat.users.filter((person:any) => person !== auth.user._id)[0]
    
    // console.log(recipient)
    return (
        <Fragment>
            
            {
                chat && user._id === auth.user._id ? <Fragment>
                    <div className="recipient-content">
                        <div className="messenger" onClick={e=> history.push(`/messenger/${person}`)}>
                            <div className="avatar"><img src={photo} height="35px" width="35px" /></div><div className="msg-head"><span>{user.name} : </span><span className="status" >Offline</span><div className="time">28.11</div></div>
                            <div className="message"><span className="text">{text}</span><span className="status">*</span></div>
                        </div>
                        
                    </div>
                </Fragment> : <Fragment>
                    <div className="recipient-content">
                        <div className="messenger" onClick={e=> history.push(`/messenger/${person}`)}>
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