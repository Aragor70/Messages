import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import '../style/messages.css'

type LoginForm = {
    email: string | null,
    password: string | null
}

const Messages = () => {

    

    return (
        <Fragment>
            <div className="messages-content">
                <div className="recipient">
                    <div className="header-person">
                        <span>avatar</span>
                        <span>name :</span>
                        <span>status</span>
                    </div>
                    
                    <div className="header-action">
                        <span>menu</span>
                    </div>
                </div>
                <div className="messages-box">
                
                    <div className="message">
                        <div className="header-message">
                            <span className="time">30.11</span>
                        </div>
                        <span className="text">text<span className="status">*</span></span>
                        <button className="delete">&times;</button>
                    </div>
                    <div className="message">
                        <div className="header-message">
                            <span className="time">30.11</span>
                        </div>
                        <span className="text">text<span className="status">*</span></span>
                        <button className="delete">&times;</button>
                    </div>
                    <div className="message">
                        <div className="header-message">
                            <span className="time">30.11</span> 
                            
                        </div>
                        <span className="text">text<span className="status">*</span></span>
                        <button className="delete">&times;</button>
                    </div>
                
                </div>
            </div>
        </Fragment>
    );
}
export default connect(null, { })(withRouter(Messages));