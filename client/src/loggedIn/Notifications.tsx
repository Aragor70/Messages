import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getConnected } from '../store/actions/messenger/connection';
import { getFromInvite, getFromMessenger, getFromService, getNotifications, switchInvite, switchMessenger, switchNotification, switchService } from '../store/actions/notification/notification';
import io from 'socket.io-client';
import '../style/auth.css'

import photo from '../style/photo.jpg'
import Notification from './Notification';
import { getFriends } from '../store/actions/friend/friend';

let socket: any;
const Notifications = ({ notification, messenger, getFromMessenger, match, getConnected, getFromInvite, getFromService, auth, history, getFriends, switchMessenger, switchService, switchInvite, switchNotification }: any) => {

    useEffect(() => {
        getFromInvite()
        getFromService()
        return getFromMessenger()
    }, [getFromMessenger])


    useEffect(() => {

        console.log('connected now')
        
        socket = io("http://localhost:3000")


        socket.emit('join', {id: auth.user._id}, () => {
            console.log('Socket client logged in')
        })

        socket.on('success', (success: any) => console.log(success))
        
        console.log('logged in')

        return () => {
            socket.disconnect()
            socket.off()


            console.log('disconnected now')
        }

    }, [match.params.id])

    useEffect(() => {
        
        socket.on('userlist', (users: any[]) => getConnected(users))

        socket.on('welcome', (users: any[]) => getConnected(users))
        
        
        
        return () => {

            socket.on('welcome', (users: any[]) => getConnected(users))


            socket.on('userlist', (users: any[]) => getConnected(users))

        }
    }, [messenger.connected])
    
    useEffect(() => {
        socket.on('chat', (msg: any) => {
            
            getFromMessenger()
        })
           
    }, [])
    useEffect(() => {
        socket.on('invite', (msg: any) => {
            
            getFromInvite()
        })
        
           
    }, [])
    
    useEffect(() => {
        socket.on('deletemessage', (msg: any) => {
            
            getFromMessenger()
            
        })
           
    }, [])
    useEffect(() => {
        socket.on('deleteinvite', (msg: any) => {
            
            getFromInvite()
        })
    }, [])

    useEffect(() => {
        socket.on('deletefriend', (msg: any) => {
            
            getFriends()
            
        })
           
    }, [])

    useEffect(() => {
        socket.on('updateinvite', (msg: any) => {
            getFriends()
            getFromInvite()
        })
           
    }, [])

    useEffect(() => {
        socket.on('updatemessage', (msg: any) => {
            getFromMessenger()
        })
           
    }, [])

    return (
        <Fragment>
            <div className="notifications-content">
                
                <div className="notifications-header">
                    messenger <span onClick={e=> switchMessenger({ messages: true})}>on/off</span>
                </div>

                {
                    notification.messenger && notification.messenger.messages.map((message: any) => <Notification key={message._id} message={message} history={history} isFriend={true} />)
                }

                <hr />

                <div className="notifications-header">
                    invites <span onClick={e=> switchInvite({ invites: true })}>on/off</span>
                </div>

                {
                    notification.invite && notification.invite.messages.map((message: any) => <Notification key={message._id} message={message} history={history} />)
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
                    service <span onClick={e=> switchService({ services: true })}>on/off</span>
                </div>

                {
                    notification.service && notification.service.messages.map((message: any) => <Notification key={message._id} history={history} message={message} />)
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
export default connect(mapStateToProps, { getFromMessenger, getConnected, getFromInvite, getFromService, getFriends, switchMessenger, switchInvite, switchService })(withRouter(Notifications));