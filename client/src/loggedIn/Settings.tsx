import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import '../style/auth.css'
import photo from '../style/photo.jpg'
import editBtn from '../style/edit3.png'
import Confirm from './reusable/Confirm';
import { update, confirm } from '../store/actions/auth/auth';
import { setAlert } from '../store/actions/alert/alert';
import io from 'socket.io-client';
import { getFromInvite, getFromMessenger } from '../store/actions/notification/notification';

const Settings = ({ socket, update, confirm, auth: { user }, getFromMessenger, getFromInvite }: any) => {

    const [emailUpdate, setEmailUpdate] = useState(false)
    const [passwordUpdate, setPasswordUpdate] = useState(false)

    const [formData, setFormData] = useState({
        password: undefined,
        email: undefined,
        new_password: undefined
    });

    const [submitEmailView, setSubmitEmailView] = useState(false)

    const [submitPasswordView, setSubmitPasswordView] = useState(false)
    

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }
    
    const submitConfirm = async(e: any, setView: any) => {
        e.preventDefault()

        const res = await confirm(formData)
        
        return setView(res || false)
        
    }

    const submitUpdate = (e: any, setView: any) => {
        e.preventDefault()
        
        update(formData, setView)
        setFormData({
            password: undefined,
            email: undefined,
            new_password: undefined
        })
        setSubmitEmailView(false)
        setSubmitPasswordView(false)

    }
    
    
    return (
        <Fragment>
            <div className="settings-content">
                {
                    emailUpdate && <Fragment>
                        {
                            submitEmailView ? null : <Confirm onChange={handleChange} handleSubmit={submitConfirm} setNext={setSubmitEmailView} formData={ formData } mode="confirm" inputName="password" inputType="password" />
                        
                        }
                        {
                            submitEmailView && <Fragment>

                                <Confirm onChange={handleChange} handleSubmit={submitUpdate} setNext={setEmailUpdate} formData={ formData } inputName="email" mode="email-update" />
                                
                            </Fragment>
                        }
                    </Fragment>
                }
                {
                    passwordUpdate && <Fragment>
                        {
                            submitPasswordView ? null : <Confirm onChange={handleChange} handleSubmit={submitConfirm} setNext={setSubmitPasswordView} formData={ formData } mode="confirm" inputName="password" inputType="password" />
                        }
                        
                        {
                            submitPasswordView && <Fragment>
                                <Confirm onChange={handleChange} handleSubmit={submitUpdate} setNext={setPasswordUpdate} formData={ formData } mode="password-update" inputName="new_password" inputType="password" />
                                
                            </Fragment>
                        }
                    </Fragment>
                }

                {
                    !emailUpdate && !passwordUpdate && <Fragment>
                        <div className="settings-header">
                            <span>account</span><img src={editBtn} onClick={e=> setEmailUpdate(true)} />
                        </div>

                        <div className="settings-row">
                            <span>_id:</span><span>1234567890</span>
                        </div>
                    
                        <div className="settings-row">
                        <span>e-mail:</span><span>{ user.email }</span>
                        </div>

                        <hr />
                    
                        <div className="settings-header">
                            authentication<img src={editBtn} onClick={e=> setPasswordUpdate(true)} />
                        </div>

                        <div className="settings-row">
                        <span>password:</span><span>{ user.password }</span>
                        </div>
                    
                        <div className="settings-row">
                        <span>two-factor:</span><span>{ user.two_factor ? 'True' : 'False' }</span>
                        </div>
                        
                        <hr />

                        <div className="settings-header">
                            signed up
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
                    </Fragment>
                }
                
            
            </div>
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { update, confirm, setAlert, getFromMessenger, getFromInvite })(withRouter(Settings));