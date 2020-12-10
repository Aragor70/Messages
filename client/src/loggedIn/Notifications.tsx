import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getNotifications } from '../store/actions/notification/notification';

import '../style/auth.css'

import photo from '../style/photo.jpg'


const Notifications = ({ getNotifications }: any) => {

    useEffect(() => {
        return getNotifications()
    }, [getNotifications])

    return (
        <Fragment>
            <div className="notifications-content">
                
                <div className="notifications-header">
                    messenger <span>on/off</span>
                </div>

                <div className="notifications-row">
                    <div className="avatar"><img src={photo} height="35px" width="35px" /></div>
                    <span className="recipient">Bambino</span>
                    <span className="message">A start-up in Manchester have just received a huge amount of investment to scale-up their platform and we're looking for the industries top tier talent to drive their product forward!</span>
                    <span className="time">30.11</span>
                </div>
                
                <div className="notifications-row">
                    <div className="avatar"><img src={photo} height="35px" width="35px" /></div>
                    <span className="recipient">Bambino</span>
                    <span className="message">A start-up in Manchester have just received a huge amount of investment to scale-up their platform and we're looking for the industries top tier talent to drive their product forward!</span>
                    <span className="time">30.11</span>
                </div>
                
                <hr />

                <div className="notifications-header">
                    invites <span>on/off</span>
                </div>

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
                    service <span>on/off</span>
                </div>

                
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
    notification: state.notification
})
export default connect(mapStateToProps, { getNotifications })(withRouter(Notifications));