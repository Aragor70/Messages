/* eslint-disable */
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getInvites } from '../store/actions/friend/invite';
import { getConnected } from '../store/actions/messenger/connection';
import { getChats } from '../store/actions/messenger/messenger';
import { getFromInvite, getFromMessenger } from '../store/actions/notification/notification';
import leftArrow from '../style/icons/left-arrow2.png';
import io from 'socket.io-client';

import notificationOn from '../style/icons/notifications/msgOn.png'
import notificationOff from '../style/icons/notifications/msgOff.png'
import menuBtn from '../style/icons/menu2.png'


const Header = ({ socket, history, auth, titlePage, setMenu, menu, notification, setNotificationView, notificationView }: any) => {

    const [isMessage, setIsMessage] = useState(false)

    useEffect(() => {
        const messages: boolean = !!notification.messenger.messages.filter((message: any) => message.opened === false && message.seen === false)[0]
        const invites: boolean = !!notification.invite.messages.filter((message: any) => message.opened === false && message.seen === false)[0]
        const services: boolean = !!notification.service.messages.filter((message: any) => message.opened === false && message.seen === false)[0]
        const feedbacks: boolean = !!notification.feedback.messages.filter((message: any) => message.opened === false && message.seen === false)[0]
        

        setIsMessage(messages || invites || services || feedbacks)
        
    }, [notification])

    
    return (
        <Fragment>
            <div className="header-shield">
            <div className="recipient">
                <div className="header-person">
                    <span>
                    {
                        history.location.pathname === '/' ? <img src={auth.user.avatar} height="35px" width="35px" onClick={e=> history.push('/profile')} /> : <img src={leftArrow} onClick={e=> history.push('/')} style={{ width: '35px', height: '35px' }} />
                    }
                    </span>
                    
                    
                    <span style={{ fontSize: '20px', color: '#c1c1c1'}}>{titlePage}</span>
                    
                    
                </div>
                
                <div className="header-action">
                    <span onClick={e=> { setNotificationView(!notificationView), setMenu(false) }} className="header-button" ><img src={isMessage ? notificationOn : notificationOff} width="35px" height="35px" /></span>
                    <span style={{ padding: '0' }} onClick={e=> { setMenu(!menu), setNotificationView(false) }} className="header-button" ><img src={menuBtn} /></span>
                </div>
                <hr />
            </div>
            </div> 
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    messenger: state.messenger,
    friend: state.friend,
    notification: state.notification
})
export default connect(mapStateToProps, {getConnected, getFromMessenger, getFromInvite})(Header);