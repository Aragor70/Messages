/* eslint-disable */
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment'

import '../../style/auth.css'

import photo from '../../style/photo.jpg'
import { getAbout } from '../../store/actions/recipient/about';
import { getRecipient } from '../../store/actions/recipient/recipient';
import { cancelInvite, getInvites, getSentInvites, sendInvite } from '../../store/actions/friend/invite';

import youtube from '../../style/icons/social-media/png/008-youtube.png'
import twitter from '../../style/icons/social-media/png/002-twitter.png'
import facebook from '../../style/icons/social-media/png/001-facebook.png'
import instagram from '../../style/icons/social-media/png/011-instagram.png'
import linkedin from '../../style/icons/social-media/png/010-linkedin.png'
import { deleteFriendship, getFriends } from '../../store/actions/friend/friend';
import io from 'socket.io-client';

let socket: any
const Recipient = ({ recipient, friend, auth, match, getAbout, getRecipient, history, getFriends, getSentInvites, sendInvite, cancelInvite, deleteFriendship }: any): any => {

    useEffect(() => {
        getAbout(match.params.id)
        getRecipient(match.params.id)
        getFriends()
        getSentInvites()
    }, [getAbout, match.params.id, getRecipient, getFriends, getSentInvites])

    console.log(match.params.id)
    useEffect(() => {
        if (match.params.id == auth.user._id) {
            history.push('/profile')
        }
    }, [match.params.id])


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

    }, [])

    useEffect(() => {
        socket.on('invite', (msg: any) => {
            
            getInvites()
        })
           
    }, [])



    return (
        <Fragment>
            <div className="profile-content">
            <div className="image-profile">
                <img src={recipient.recipient.avatar} style={{maxHeight: '100%'}} />
            </div>
            <div className="profile-name">
                {recipient.recipient.name}
            </div>
            <div className="profile-buttons">
                {
                    friend.friends && !!friend.friends.filter((person: any) => person._id == recipient.recipient._id)[0] ? <Fragment>
                        
                        <span><button onClick={e=> history.push(`/messenger/${recipient.recipient._id}`)}>message</button></span><span><button onClick={e=> deleteFriendship(recipient.recipient._id)}>delete</button></span>
            
                    </Fragment> : <Fragment>

                        {
                            friend.sentInvites && !!friend.sentInvites.filter((invitation: any) => invitation.recipient._id == recipient.recipient._id || invitation.recipient == recipient.recipient._id)[0] ? <Fragment>
                                <span><button onClick={e=> cancelInvite(recipient.recipient._id)}>cancel</button></span>
                            </Fragment> : <Fragment>
                                <span><button onClick={e=> sendInvite(recipient.recipient._id, socket)}>invite</button></span>
                            </Fragment>
                        }
                        
                        
            
                    </Fragment>
                }
                
            </div>
            
                    <div className="profile-header">
                        account
                    </div>
                    <div className="profile-row">
                        <span>status</span><span>{recipient.recipient.status}</span>
                    </div>

                    {
                        recipient.about.status || recipient.about.age || recipient.about.gender && <Fragment>
                            <div className="profile-header">
                                about me
                            </div>
                            {
                                recipient.about.status && <div className="profile-row" >
                                    <span>status</span><span>{recipient.about.status}</span>
                                </div>
                            }
                            {
                                recipient.about.age && <div className="profile-row">
                                    <span>age</span><span>{recipient.about.age && moment(recipient.about.age).format('DD-MM-YYYY')}</span>
                                </div>
                            }
                            {
                                recipient.about.gender && <div className="profile-row">
                                    <span>gender</span><span>{recipient.about.gender}</span>
                                </div>
                            }
                            
                        </Fragment>
                    }
                    
                   
                    {
                        recipient.about && recipient.about.social && <Fragment>
                            <div className="profile-header">
                                social media 
                            </div>
                    
                            <div className="profile-social-row">
                            
                            {
                                recipient.about && recipient.about.social && recipient.about.social.youtube && <a href={recipient.about && recipient.about.social && recipient.about.social.youtube } target="_blank"><img src={youtube} /></a>
                            
                            }
                            {
                                recipient.about && recipient.about.social && recipient.about.social.twitter && <a href={recipient.about && recipient.about.social && recipient.about.social.twitter } target="_blank"><img src={twitter} /></a>
                            
                            }
                            {
                                recipient.about && recipient.about.social && recipient.about.social.facebook && <a href={recipient.about && recipient.about.social && recipient.about.social.facebook } target="_blank"><img src={facebook} /></a>
                            
                            }
                            {
                                recipient.about && recipient.about.social && recipient.about.social.linkedin && <a href={recipient.about && recipient.about.social && recipient.about.social.linkedin } target="_blank"><img src={linkedin} /></a>
                            
                            }
                            {
                                recipient.about && recipient.about.social && recipient.about.social.instagram && <a href={recipient.about && recipient.about.social && recipient.about.social.instagram } target="_blank"><img src={instagram} /></a>
                    
                            } 
                            </div>
                        </Fragment>
                    }
                    <hr />
            </div>
            
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    auth: state.auth,
    recipient: state.recipient,
    friend: state.friend
})
export default connect(mapStateToProps, { getAbout, getRecipient, getFriends, getSentInvites, sendInvite, cancelInvite, deleteFriendship })(withRouter(Recipient));