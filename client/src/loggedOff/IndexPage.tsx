import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import facebookImg from '../style/icons/social-media/png/facebook-white.png'
import linkedinImg from '../style/icons/social-media/png/linkedin-white.png'
import twitterImg from '../style/icons/social-media/png/twitter-white.png'

const IndexPage = () => {

    return (
        <Fragment>
            <div className="shield">
                
                <div className="front-param-left">
                    
                    ┻┳|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hello<br/>
                    ┳┻| _&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;friend<br/>
                    ┻┳| •.•)<br/>
                    ┳┻|⊂ﾉ<br/>
                    ┻┳|<br/>
                    
                </div>
                

                <div className="front-param">
                    
                <h1>Meet Types, </h1>
                
                <p>You can communicate with anyone in any location with the reliability of texting and the richness of chat.</p> 
                <p>Connect with friends and family, send photos, videos, GIFs, emoji, and more.
                Intuitive and modern, Types makes conversations easy, expressive, and fun.</p>
                <p>Nicolai's official web React Redux + Typescript real chat app. </p>
                </div>
                <div className="front-param social-media">
                    <h3>Connect With Us</h3>
                    <p>Here's where you can find us on Social Media</p>
                    <div>
                        <img src={facebookImg} />
                        <img src={linkedinImg} />
                        <img src={twitterImg} />
                    </div>
                    
                </div>
            
            </div>
        </Fragment>
    );
}
export default IndexPage;