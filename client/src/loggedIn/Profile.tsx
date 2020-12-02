import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getAboutMe, updateAboutMe, updateSocial } from '../store/actions/about/about';
import moment from 'moment'

import '../style/auth.css'

import photo from '../style/photo.jpg'
import editBtn from '../style/edit3.png'
import youtube from '../style/icons/social-media/png/008-youtube.png'
import twitter from '../style/icons/social-media/png/002-twitter.png'
import facebook from '../style/icons/social-media/png/001-facebook.png'
import instagram from '../style/icons/social-media/png/011-instagram.png'
import linkedin from '../style/icons/social-media/png/010-linkedin.png'
import Alert from '../utils/alert';



const Profile = ({ getAboutMe, updateAboutMe, updateSocial, about: { about } }: any): any => {

    useEffect(() => {
        return getAboutMe()
    }, [getAboutMe]);

    const [editMode, setEditMode] = useState(false)
    const [editSocialMode, setEditSocialMode] = useState(false)

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
        setSocialMedia(false)
    }
    useEffect(() => {
        return setFormData({
            age: about.age,
            status: about.status,
            gender: about.gender
        })

    }, [])

    useEffect(() => {
        return setSocialMedia({
            youtube: about.social && about.social.youtube,
            twitter: about.social && about.social.twitter,
            facebook: about.social && about.social.facebook,
            linkedin: about.social && about.social.linkedin,
            instagram: about.social && about.social.instagram
        })
    }, [])

    return (
        <Fragment>
            <div className="profile-content">
            <div className="image-profile">
                <img src={photo} style={{maxHeight: '100%'}} />
            </div>
            <div className="front-name">
                Mikołaj Prus
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
                
                about me <img src={editBtn} onClick={e=> setEditMode(!editMode)} />
            </div>

            <form onSubmit={e=>handleUpdate(e)}>
            <div className="profile-row">
                <span>relation status</span>
                
                {
                    editMode ? <span><input type="text" name="status" value={formData.status} onChange={e=> handleChange(e) } /></span> : <span>{about.status}</span>
                }
            </div>
            <div className="profile-row">
                <span>age</span>
                {
                    editMode ? <span><input type="text" name="age" value={formData.age} onChange={e=> handleChange(e) } /></span> : <span>{moment(about.age).format('DD-MM-YYYY') }</span>
                }
            </div>
            <div className="profile-row">
            <span>gender</span>
                {
                    editMode ? <span><input type="text" name="gender" value={formData.gender} onChange={e=> handleChange(e) } /></span> : <span>{about.gender}</span>
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

            <div className="profile-header">
                social media <img src={editBtn} onClick={e=> setEditSocialMode(!editSocialMode)} id="editBtn" />
            </div>

            <div className="profile-social-row">
                <a href={about && about.social && about.social.youtube } target="_blank"><img src={youtube} /></a>
                <a href={about && about.social && about.social.twitter } target="_blank"><img src={twitter} /></a>
                <a href={about && about.social && about.social.facebook } target="_blank"><img src={facebook} /></a>
                <a href={about && about.social && about.social.linkedin } target="_blank"><img src={linkedin} /></a>
                <a href={about && about.social && about.social.instagram } target="_blank"><img src={instagram} /></a>
                
            </div>
            {
                editSocialMode && <Fragment>
                    <form onSubmit={e=> handleSocialUpdate(e)}>
                    <div className="profile-social-icon-row">
                        <Alert />
                        <span>youtube</span>
                        <input type="text" name="youtube" value={socialMedia.youtube} placeholder="https://" onChange={e=> handleSocial(e) } />
                        <span>twitter</span>
                        <input type="text" name="twitter" value={socialMedia.twitter} placeholder="https://" onChange={e=> handleSocial(e) } />
                        <span>facebook</span>
                        <input type="text" name="facebook" value={socialMedia.facebook} placeholder="https://" onChange={e=> handleSocial(e) } />
                        <span>linkedin</span>
                        <input type="text" name="linkedin" value={socialMedia.linkedin} placeholder="https://" onChange={e=> handleSocial(e) } />
                        <span>instagram</span>
                        <input type="text" name="instagram" value={socialMedia.instagram} placeholder="https://" onChange={e=> handleSocial(e) } />
                    </div>
               
                    <div className="profile-row">
                        <button type="submit">update</button>
                    </div>
                    </form>
                </Fragment>
            }
            
            <hr />

            </div>
            
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    about: state.about
})
export default connect(mapStateToProps, { getAboutMe, updateAboutMe, updateSocial })(withRouter(Profile));