import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import photo from '../style/photo.jpg'
import { getNotEqual, getNotEqualById } from '../utils/getDataFromArray';


const MessagePreview = ({ message, auth, history, chat, messenger }: any) => {
    
    const { text, date, user, recipient } = message
    
    const [person, setRecipient] = useState<any>('')

    const [isOnline, setIsOnline] = useState(false)

    useEffect(() => {
        if (chat.users && auth.user) {
            return setRecipient(getNotEqualById(chat.users, auth.user._id))
        }
    }, [messenger.connected, auth.user._id])

    useEffect(() => {
        setIsOnline(!!messenger.connected.filter((element:any) => element.id == person._id )[0])
    }, [messenger.connected, person])

    // const recipientUser: any = chat.users.filter((person:any) => person !== auth.user._id)[0]
    
    return (
        <Fragment>
            
            {
                chat && person && person._id === auth.user._id ? <Fragment>
                    <div className="recipient-content">
                        <div className="messenger" onClick={e=> history.push(`/messenger/${person._id}`)}>
                            <div className="avatar"><img src={person.avatar} height="35px" width="35px" /></div><div className="msg-head"><span>{person.name} : </span><span className="status" >{isOnline ? "online" : "offline"}</span><div className="time">{Date.parse(date) < Date.now() - 86400000 ? moment(date).format('DD-MM') : moment(date).format('HH:mm:SS') }</div></div>
                            <div className="message"><span className="text">{text}</span><span className="status">{message.seen ? "s" : message.opened ? "o" : null}</span></div>
                        </div>
                        
                    </div>
                </Fragment> : <Fragment>
                    <div className="recipient-content">
                        <div className="messenger" onClick={e=> history.push(`/messenger/${person._id}`)}>
                            <div className="avatar"><img src={person.avatar} height="35px" width="35px" /></div><div className="msg-head"><span>{person.name} : </span><span className="status" >{isOnline ? "online" : "offline"}</span><div className="time">{Date.parse(date) < Date.now() - 86400000 ? moment(date).format('DD-MM') : moment(date).format('HH:mm:SS') }</div></div>
                            <div className="message"><span className="text">{text}</span><span className="status">{message.seen ? "s" : message.opened ? "o" : null}</span></div>
                        </div>
                        
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}
const mapStateToProps = (state: any) => ({
    auth: state.auth,
    messenger: state.messenger
})
export default connect(mapStateToProps, { })(withRouter(MessagePreview));