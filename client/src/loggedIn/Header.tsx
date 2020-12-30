import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getInvites } from '../store/actions/friend/invite';
import { getConnected } from '../store/actions/messenger/connection';
import { getChats } from '../store/actions/messenger/messenger';
import { getFromInvite, getFromMessenger } from '../store/actions/notification/notification';
import leftArrow from '../style/icons/left-arrow2.png';
import io from 'socket.io-client';

import notificationOn from '../style/icons/notificationOn.png'
import notificationOff from '../style/icons/notificationOff.png'
import menuBtn from '../style/icons/menu2.png'


let socket: any;
const Header = ({ history, auth, titlePage, setMenu, menu, match, getConnected, messenger, friend, getFromMessenger, notification, getFromInvite }: any) => {

    useEffect(() => {

        console.log('connected now')
        
        socket = io("http://localhost:3000")


        socket.emit('join', {id: auth.user._id}, () => {
            console.log('Socket client logged in')
        })

        socket.on('success', (success: any) => console.log(success))
        
        console.log('logged in <><><><>Header<><><><>')

        return () => {
            socket.disconnect()
            socket.off()

            console.log('<><><><>Header disconnection<><><><>')
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
        socket.on('deletemessage', (msg: any) => {
            getFromMessenger()
            
        })
           
    }, [])

    useEffect(() => {
        socket.on('invite', (msg: any) => {
            getFromInvite()
        })
           
    }, [])
    useEffect(() => {
        socket.on('deleteinvite', (msg: any) => {
            getFromInvite()
        })
    }, [])

    return (
        <Fragment>
            <div className="header-shield">
            <div className="recipient">
                    <div className="header-person">
                        <span>
                        {
                          history.location.pathname === '/' ? <img src={auth.user.avatar} height="35px" width="35px" /> : <img src={leftArrow} onClick={e=> history.push('/')} style={{ width: '35px', height: '35px' }} />
                        }
                        </span>
                      
                        
                      <span style={{ fontSize: '20px'}}>{titlePage}</span>
                        
                        
                    </div>
                    
                    <div className="header-action">
                        <span onClick={e=> history.push('/notifications')}><img src={!!notification.messenger.messages.filter((msg: any) => msg.opened)[0] ? notificationOn : notificationOff} /></span>
                        <span style={{ padding: '0' }} onClick={e=> setMenu(!menu)}><img src={menuBtn} /></span>
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