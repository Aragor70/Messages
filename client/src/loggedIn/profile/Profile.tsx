/* eslint-disable */
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { deleteSocial, getAboutMe, updateAboutMe, updateSocial } from '../../store/actions/about/about';
import moment from 'moment'

import '../../style/auth.css'

import photo from '../../style/photo.jpg'
import editBtn from '../../style/edit3.png'
import closeBtn from '../../style/icons/close1.png'
import deleteBtn from '../../style/icons/delete1.png'
import leftArrowBtn from '../../style/icons/left-arrow2.png'
import youtube from '../../style/icons/social-media/png/008-youtube.png'
import twitter from '../../style/icons/social-media/png/002-twitter.png'
import facebook from '../../style/icons/social-media/png/001-facebook.png'
import instagram from '../../style/icons/social-media/png/011-instagram.png'
import linkedin from '../../style/icons/social-media/png/010-linkedin.png'
import auth from '../../store/reducers/auth';



const Profile = ({ getAboutMe, updateAboutMe, updateSocial, about: { about }, deleteSocial, auth }: any): any => {

    useEffect(() => {
        return getAboutMe()
    }, [getAboutMe, deleteSocial]);

    const [editMode, setEditMode] = useState(false)
    const [editSocialMode, setEditSocialMode] = useState(false)

    const [editForm, setEditForm] = useState<any>({
        status: false,
        age: false,
        gender: false
    })
    const [editSocial, setEditSocial] = useState<any>({
        youtube: false,
        twitter: false,
        facebook: false,
        linkedin: false,
        instagram: false
    })

    const [formData, setFormData] = useState<any>({
        age: '',
        status: '',
        gender: ''
    })
    const [socialMedia, setSocialMedia] = useState<any>({
        youtube: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: ''
    })
    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSocial = (e: any) => {
        setSocialMedia({ ...socialMedia, [e.target.name]: e.target.value })
    }

    const handleUpdate = (e: any) => {
        e.preventDefault()
        updateAboutMe(formData)
        setEditMode(false)
    }

    const handleSocialUpdate = (e: any) => {
        e.preventDefault()
        updateSocial(socialMedia)
        setEditSocialMode(false)
    }
    useEffect(() => {
        setEditForm({
            status: false,
            age: false,
            gender: false,
        })
        return setFormData({
            age: moment(about.age).format('DD-MM-YYYY'),
            status: about.status,
            gender: about.gender
        })

    }, [editMode])

    useEffect(() => {
        setEditSocial({
            youtube: false,
            twitter: false,
            facebook: false,
            linkedin: false,
            instagram: false
        })
        return setSocialMedia({
            youtube: about.social && about.social.youtube,
            twitter: about.social && about.social.twitter,
            facebook: about.social && about.social.facebook,
            linkedin: about.social && about.social.linkedin,
            instagram: about.social && about.social.instagram
        })
    }, [editSocialMode, deleteSocial])

    return (
        <Fragment>
            <div className="profile-content">
            <div className="image-profile">
                <img src={photo} style={{maxHeight: '100%'}} />
            </div>
            <div className="profile-name">
                {auth.user.name}
                
            </div>
            {
                editMode || editSocialMode ? null : <Fragment>
                    <div className="profile-header">
                        account
                    </div>
                    <div className="profile-row">
                        <span>status</span><span>{auth.user.status}</span>
                    </div>
                    <div className="profile-row">
                        <span>do not disturb</span><span>on / off</span>
                    </div>
                </Fragment>
            }
            
            {
                editSocialMode ? null : <Fragment>
                    <div className="profile-header">
                
                        about me <img src={editMode ? leftArrowBtn : editBtn} onClick={e=> setEditMode(!editMode)} />
                    </div>

                    <form onSubmit={e=>handleUpdate(e)}>
                    <div className="profile-row" >
                        <span onClick={e=> setEditForm({status: true})}>status</span>
                        {
                            editMode && editForm.status && <img src={closeBtn} onClick={e=> setEditForm({status: false})} />
                        
                        }
                        
                        {
                            editMode ? editForm.status ? <span><input type="text" name="status" value={formData.status} onChange={e=> handleChange(e) } /></span> : <span onClick={e=> setEditForm({status: true})}>{formData.status ? formData.status : about.status}</span> : <span onClick={e=> setEditForm({status: true})}>{about.status}</span>
                        }
                    </div>
                    <div className="profile-row">
                        <span onClick={e=> setEditForm({age: true})}>age</span>
                        {
                            editMode && editForm.age && <img src={closeBtn} onClick={e=> setEditForm({age: false})} />
                        
                        }
                        {
                            editMode ? editForm.age ? <span><input type="text" name="age" value={formData.age} onChange={e=> handleChange(e) } /></span> : <span onClick={e=> setEditForm({age: true})}>{formData.age ? moment(formData.age).format('DD-MM-YYYY') : moment(about.age).format('DD-MM-YYYY') }</span> : <span onClick={e=> setEditForm({age: true})}>{moment(about.age).format('DD-MM-YYYY')}</span>
                        }
                    </div>
                    <div className="profile-row">
                    <span onClick={e=> setEditForm({gender: true})}>gender</span>
                        {
                            editMode && editForm.gender && <img src={closeBtn} onClick={e=> setEditForm({gender: false})} />
                        
                        }
                        {
                            editMode ? editForm.gender ? <span><input type="text" name="gender" value={formData.gender} onChange={e=> handleChange(e) } /></span> : <span onClick={e=> setEditForm({gender: true})}>{formData.gender ? formData.gender : about.gender}</span> : <span onClick={e=> setEditForm({gender: true})}>{about.gender}</span>
                        }
                    </div>
                    {
                        editMode && <Fragment>
                            <div className="profile-row">
                                <button type="submit">update</button>
                            </div>
                        </Fragment>
                    }
                    </form>
                </Fragment>
            }
            
            {
                editMode ? null : <Fragment>
                    <div className="profile-header">
                        social media <img src={editSocialMode ? leftArrowBtn : editBtn} onClick={e=> setEditSocialMode(!editSocialMode)} id="editBtn" />
                    </div>
                    
                    {
                        editSocialMode ? <Fragment>
                            <div className="profile-social-row">
                                <a href={about && about.social && about.social.youtube } target="_blank"><img src={youtube} /></a>
                                <a href={about && about.social && about.social.twitter } target="_blank"><img src={twitter} /></a>
                                <a href={about && about.social && about.social.facebook } target="_blank"><img src={facebook} /></a>
                                <a href={about && about.social && about.social.linkedin } target="_blank"><img src={linkedin} /></a>
                                <a href={about && about.social && about.social.instagram } target="_blank"><img src={instagram} /></a>
                                
                            </div>
                        </Fragment> : <Fragment>
                            <div className="profile-social-row">
                                <a href={about && about.social && about.social.youtube } target="_blank"><img src={youtube} /></a>
                                <a href={about && about.social && about.social.twitter } target="_blank"><img src={twitter} /></a>
                                <a href={about && about.social && about.social.facebook } target="_blank"><img src={facebook} /></a>
                                <a href={about && about.social && about.social.linkedin } target="_blank"><img src={linkedin} /></a>
                                <a href={about && about.social && about.social.instagram } target="_blank"><img src={instagram} /></a>
                                
                            </div>
                        </Fragment>
                    }
                    
                    {
                        editSocialMode && <Fragment>
                            <form onSubmit={e=> handleSocialUpdate(e)}>
                                <div className="profile-social-icon-row">
                                    <span onClick={e=> setEditSocial({youtube: !editSocial.youtube})}>youtube <img src={youtube} />{editSocial.youtube && <img src={deleteBtn} className="delete-button" onClick={e=>{deleteSocial("youtube"), setSocialMedia({youtube: null})}} />}</span>
                                    {
                                        editSocial.youtube ? <input type="text" name="youtube" value={socialMedia.youtube} placeholder="https://" onChange={e=> handleSocial(e) } /> : socialMedia.youtube ? <span className="social-address">{socialMedia.youtube}</span> : <span className="social-address">{about && about.social && about.social.youtube || "empty"}</span>
                                    }
                                    <span onClick={e=> setEditSocial({twitter: !editSocial.twitter})}>twitter <img src={twitter} />{editSocial.twitter && <img src={deleteBtn} className="delete-button" onClick={e=>{deleteSocial("twitter"), setSocialMedia({twitter: null})}} />}</span>
                                    {
                                        editSocial.twitter ? <input type="text" name="twitter" value={socialMedia.twitter} placeholder="https://" onChange={e=> handleSocial(e) } /> : socialMedia.twitter ? <span className="social-address">{socialMedia.twitter}</span> : <span className="social-address">{about && about.social && about.social.twitter || "empty"}</span>
                                    }
                                    <span onClick={e=> setEditSocial({facebook: !editSocial.facebook})}>facebook <img src={facebook} />{editSocial.facebook && <img src={deleteBtn} className="delete-button" onClick={e=>{deleteSocial("facebook"), setSocialMedia({facebook: null})}} />}</span>
                                    {
                                        editSocial.facebook ? <input type="text" name="facebook" value={socialMedia.facebook} placeholder="https://" onChange={e=> handleSocial(e) } /> : socialMedia.facebook ? <span className="social-address">{socialMedia.facebook}</span> : <span className="social-address">{about && about.social && about.social.facebook || "empty"}</span>
                                    }
                                    
                                    <span onClick={e=> setEditSocial({linkedin: !editSocial.linkedin})}>linkedin <img src={linkedin} />{editSocial.linkedin && <img src={deleteBtn} className="delete-button" onClick={e=>{deleteSocial("linkedin"), setSocialMedia({linkedin: null})}} />}</span>
                                    {
                                        editSocial.linkedin ? <input type="text" name="linkedin" value={socialMedia.linkedin} placeholder="https://" onChange={e=> handleSocial(e) } /> : socialMedia.linkedin ? <span className="social-address">{socialMedia.linkedin}</span> : <span className="social-address">{about && about.social && about.social.linkedin || "empty"}</span>
                                    }
                                    <span onClick={e=> setEditSocial({instagram: !editSocial.instagram})}>instagram <img src={instagram} />{editSocial.instagram && <img src={deleteBtn} className="delete-button" onClick={e=>{deleteSocial("instagram"), setSocialMedia({instagram: null})}} />}</span>
                                    {
                                        editSocial.instagram ? <input type="text" name="instagram" value={socialMedia.instagram} placeholder="https://" onChange={e=> handleSocial(e) } /> : socialMedia.instagram ? <span className="social-address">{socialMedia.instagram}</span> : <span className="social-address">{about && about.social && about.social.instagram || "empty"}</span>
                                    }

                                </div>
                        
                                <div className="profile-row">
                                    <button type="submit">update</button>
                                </div>
                            </form>
                        </Fragment>
                    }
                    
                </Fragment>
            }
            
            <hr />

            </div>
            
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    about: state.about,
    auth: state.auth
})
export default connect(mapStateToProps, { getAboutMe, updateAboutMe, updateSocial, deleteSocial })(withRouter(Profile));