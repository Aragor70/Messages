import React, { Fragment } from 'react';
import moment from 'moment';
import photo from '../style/photo.jpg';


const Notification = ({ message, history, isFriend=false }: any) => {

    console.log(message)

    return (
        <Fragment>
            <div className="notifications-row">
                <div className="avatar" onClick={e=>history.push(`/profile/${message.user._id}`)}><img src={message.user.avatar} height="35px" width="35px" /></div>
                <span className="recipient" onClick={e=>history.push(`/profile/${message.user._id}`)}>{message.user.name}</span>
                <span className="message" onClick={e=>isFriend ? history.push(`/messenger/${message.user._id}`) : null}>{message.text}</span>
                <span className="time">{ Date.parse(message.date) < Date.now() - 86400000 ? moment(message.date).format('DD-MM') : moment(message.date).format('HH:mm:SS') }</span>
            </div>
        </Fragment>
    );
}
export default Notification;