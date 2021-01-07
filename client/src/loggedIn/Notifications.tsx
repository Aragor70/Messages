import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getConnected } from '../store/actions/messenger/connection';
import { deleteInviteNotification, deleteMessageNotification, getFromInvite, getFromMessenger, getFromService, getNotifications, switchInvite, switchMessenger, switchNotification, switchService } from '../store/actions/notification/notification';
import io from 'socket.io-client';
import '../style/auth.css'

import messengerName from '../style/icons/messenger.png'
import inviteName from '../style/icons/invite.png'
import serviceName from '../style/icons/service.png'


import photo from '../style/photo.jpg'
import Notification from './Notification';
import { getFriends } from '../store/actions/friend/friend';
import { updateInvite } from '../store/actions/friend/invite';
import { openMessage } from '../store/actions/messenger/messenger';

const Notifications = ({ socket, notification, messenger, getFromMessenger, match, getConnected, getFromInvite, getFromService, auth, history, getFriends, switchMessenger, switchService, switchInvite, switchNotification, setNotificationView, notificationView, openMessage, updateInvite, deleteMessageNotification, deleteInviteNotification }: any) => {

    useEffect(() => {
        getFromInvite()
        getFromService()
        return getFromMessenger()
    }, [getFromMessenger, getFromService, getFromInvite])



    return (
        <Fragment>
            
            <div className="notifications-content">
                
                <div className="notifications-header">
                    <img src={messengerName} style={{ width: '35px', height: '35px'}} /> <span onClick={e=> switchMessenger({ messages: true})}>on/off</span>
                </div>

                {
                    notification.messenger && notification.messenger.messages.map((message: any) => <Notification key={message._id} message={message} history={history} isFriend={true} setNotificationView={setNotificationView} notificationView={notificationView} openFunction={openMessage} deleteFunction={deleteMessageNotification} socket={socket} />)
                }

                <hr />

                <div className="notifications-header">
                <img src={inviteName} style={{ width: '35px', height: '35px'}} /> <span onClick={e=> switchInvite({ invites: true })}>on/off</span>
                </div>

                {
                    notification.invite && notification.invite.messages.map((message: any) => <Notification key={message._id} message={message} history={history} setNotificationView={setNotificationView} notificationView={notificationView} openFunction={updateInvite} deleteFunction={deleteInviteNotification} socket={socket} runner={getFromMessenger} />)
                }
                <div className="notifications-row">
                    <div className="avatar"><img src={photo} height="35px" width="35px" /></div>
                    <span className="recipient">Bambino</span>
                    <span className="message">Join me now</span>
                    <span className="time">30.11</span>
                </div>
                
                <div className="notifications-row">
                    <div className="avatar"><img src={photo} height="35px" width="35px" /></div>
                    <span className="recipient">Bambino</span>
                    <span className="message">Join me now</span>
                    <span className="time">30.11</span>
                </div>
                <hr />

                <div className="notifications-header">
                    <img src={serviceName} style={{ width: '35px', height: '35px'}} /> <span onClick={e=> switchService({ services: true })}>on/off</span>
                </div>

                {
                    notification.service && notification.service.messages.map((message: any) => <Notification key={message._id} history={history} message={message} setNotificationView={setNotificationView} notificationView={notificationView} socket={socket} runner={getFromInvite} />)
                }
                
                <div className="notifications-row">
                    <div className="avatar"><img src={photo} height="35px" width="35px" /></div>
                    <span className="recipient">Service</span>
                    <span className="message">Look here</span>
                    <span className="time">30.11</span>
                </div>

                <div className="notifications-row">
                    <div className="avatar"><img src={photo} height="35px" width="35px" /></div>
                    <span className="recipient">Service</span>
                    <span className="message">Hello Bambino</span>
                    <span className="time">30.11</span>
                </div>
                <hr />

                
            </div>
            
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    notification: state.notification,
    messenger: state.messenger,
    auth: state.auth
})
export default connect(mapStateToProps, { getFromMessenger, getConnected, getFromInvite, getFromService, getFriends, switchMessenger, switchInvite, switchService, openMessage, updateInvite, deleteMessageNotification, deleteInviteNotification })(withRouter(Notifications));