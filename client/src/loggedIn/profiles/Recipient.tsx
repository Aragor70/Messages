/* eslint-disable */
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment'

import '../../style/auth.css'

import photo from '../../style/photo.jpg'
import { getAbout } from '../../store/actions/recipient/about';
import { getRecipient } from '../../store/actions/recipient/recipient';
import { sendInvite } from '../../store/actions/friend/invite';

import youtube from '../../style/icons/social-media/png/008-youtube.png'
import twitter from '../../style/icons/social-media/png/002-twitter.png'
import facebook from '../../style/icons/social-media/png/001-facebook.png'
import instagram from '../../style/icons/social-media/png/011-instagram.png'
import linkedin from '../../style/icons/social-media/png/010-linkedin.png'

const Recipient = ({ recipient, auth, match, getAbout, getRecipient, history }: any): any => {

    useEffect(() => {
        getAbout(match.params.id)
        getRecipient(match.params.id)
    }, [getAbout, match.params.id, getRecipient])

    console.log(recipient)


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
                <span><button onClick={e=> history.push(`/messenger/${recipient.recipient._id}`)}>message</button></span><span><button onClick={e=> sendInvite(recipient._id)}>invite</button></span>
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
    recipient: state.recipient
})
export default connect(mapStateToProps, { getAbout, getRecipient })(withRouter(Recipient));