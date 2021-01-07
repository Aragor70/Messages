import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import chatImg from '../style/chat.png';


// <h1><img src={chatImg} /></h1>

const IndexPage = () => {

    return (
        <Fragment>
            <div className="shield">
                
                <div className="front-param-center">
                    
                    
                    <p><span><Link to="/sign-in">log in</Link></span><span><Link to ="/sign-up">get started</Link></span></p>
                    
                </div>
                

                <div className="front-param">
                    
                <h1>Meet Types, </h1>
                
                <p>You can communicate with anyone in any location with the reliability of texting and the richness of chat.</p> 
                <p>Connect with friends and family, send photos, videos, GIFs, emoji, and more.
                Intuitive and modern, Types makes conversations easy, expressive, and fun.</p>
                <p>Nicolai's official web React Redux + Typescript real chat app. </p>
                </div>
            
            
            </div>
        </Fragment>
    );
}
export default IndexPage;