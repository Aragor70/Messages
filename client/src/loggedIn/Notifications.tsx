import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getConnected } from '../store/actions/messenger/connection';
import { deleteInviteNotification, deleteMessageNotification, getFromInvite, getFromMessenger, getFromService, getNotifications, switchMessenger, switchInvite, switchService } from '../store/actions/notification/notification';

import '../style/auth.css'

import messengerName from '../style/icons/messenger.png'
import inviteName from '../style/icons/invite.png'
import serviceName from '../style/icons/service.png'


import Notification from './Notification';
import { getFriends } from '../store/actions/friend/friend';
import { updateInvite } from '../store/actions/friend/invite';
import { openMessage } from '../store/actions/messenger/messenger';
import SwitchButton from './reusable/SwitchButton';

const Notifications = ({ socket, notification, getFromMessenger, getFromInvite, getFromService, auth, history, switchMessenger, switchService, switchInvite, setNotificationView, notificationView, openMessage, updateInvite, deleteMessageNotification, deleteInviteNotification, getNotifications }: any) => {

    useEffect(() => {
        getNotifications()
        getFromInvite()
        getFromService()
        return getFromMessenger()
    }, [getFromMessenger, getFromService, getFromInvite, getNotifications])

    

    return (
        <Fragment>
            
            <div className="notifications-content">
                
                <div className="notifications-header">
                    <img alt="switchButton" src={messengerName} style={{ width: '35px', height: '35px'}} /> <span><SwitchButton user={auth.user} clickFunction={switchMessenger} formData={{ messages: true }} loader={notification.messenger.turn_on} /></span>
                </div>

                {
                    notification.messenger && notification.messenger.messages.map((message: any) => <Notification key={message._id} message={message} history={history} isFriend={true} setNotificationView={setNotificationView} notificationView={notificationView} openFunction={openMessage} deleteFunction={deleteMessageNotification} socket={socket} />)
                }

                <hr />

                <div className="notifications-header">
                <img alt="authButton" src={inviteName} style={{ width: '35px', height: '35px'}} /> <span><SwitchButton user={auth.user} clickFunction={switchInvite} formData={{ invites: true }} loader={notification.invite.turn_on} /></span>
                </div>

                {
                    notification.invite && notification.invite.messages.map((message: any) => <Notification key={message._id} message={message} history={history} setNotificationView={setNotificationView} notificationView={notificationView} openFunction={updateInvite} deleteFunction={deleteInviteNotification} socket={socket} runner={getFromMessenger} />)
                }
                
                <hr />

                <div className="notifications-header">
                    <img alt="authButton2" src={serviceName} style={{ width: '35px', height: '35px'}} /> <span><SwitchButton user={auth.user} clickFunction={switchService} formData={{ services: true }} loader={notification.service.turn_on} /></span>
                </div>

                {
                    notification.service && notification.service.messages.map((message: any) => <Notification key={message._id} history={history} message={message} setNotificationView={setNotificationView} notificationView={notificationView} socket={socket} runner={getFromInvite} />)
                }
                
                
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
export default connect(mapStateToProps, { getFromMessenger, getConnected, getFromInvite, getFromService, getFriends, switchMessenger, switchInvite, switchService, openMessage, updateInvite, deleteMessageNotification, deleteInviteNotification, getNotifications })(withRouter(Notifications));