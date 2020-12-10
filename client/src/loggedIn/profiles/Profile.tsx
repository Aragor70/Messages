/* eslint-disable */
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { deleteSocial, getAboutMe, updateAboutMe, updateSocial } from '../../store/actions/about/about';
import moment from 'moment'

import '../../style/auth.css'

import photo from '../../style/photo.jpg'



const Profile = ({ user, auth }: any): any => {


    return (
        <Fragment>
            <div className="profile-content">
            <div className="image-profile">
                <img src={photo} style={{maxHeight: '100%'}} />
            </div>
            <div className="front-name">
                {user.name}
            </div>
            
                    <div className="profile-header">
                        account
                    </div>
                    <div className="profile-row">
                        <span>status</span><span>Online</span>
                    </div>
                    <div className="profile-row">
                        <span>do not disturb</span><span>on / off</span>
                    </div>
            
                    <div className="profile-header">
                
                        about me
                    </div>

                    <div className="profile-row" >
                        <span >status</span>
                        
                    </div>
                    <div className="profile-row">
                        <span>age</span>
                        
                        
                    </div>
                    <div className="profile-row">
                    <span >gender</span>
                        
                        
                    </div>
                   
            
                    <div className="profile-header">
                        social media 
                    </div>
                    
                            <div className="profile-social-row">
                                
                            </div>
                    
                                <div className="profile-social-icon-row">
                                    

                                </div>
                        
                                
                                <hr />
            </div>
            
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { getAboutMe, updateAboutMe, updateSocial, deleteSocial })(withRouter(Profile));