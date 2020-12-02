import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import '../style/auth.css'
import photo from '../style/photo.jpg'
import editBtn from '../style/edit3.png'

const Settings = () => {

    

    return (
        <Fragment>
            <div className="settings-content">
                
                <div className="settings-header">
                    <span>account</span>
                </div>

                <div className="settings-row">
                    <span>_id:</span><span>1234567890</span>
                </div>
            
                <div className="settings-row">
                <span>e-mail:</span><span>gmail@gmail.com</span><img src={editBtn} />
                </div>

                <hr />
            
                <div className="settings-header">
                    authentication
                </div>

                <div className="settings-row">
                <span>password:</span><span>**********</span><img src={editBtn} />
                </div>
            
                <div className="settings-row">
                <span>two-factor:</span><span>true / false</span>
                </div>
                
                <hr />

                <div className="settings-header">
                    sign up
                </div>

                <div className="settings-row">
                    <span>date</span><span>30.11.2020</span>
                </div>

                <hr />
                
                <div className="settings-header">
                    access
                </div>

                <div className="settings-row">
                    <span>role</span><span>User</span>
                </div>
                <hr />
            
            </div>
        </Fragment>
    );
}
export default connect(null, {})(withRouter(Settings));