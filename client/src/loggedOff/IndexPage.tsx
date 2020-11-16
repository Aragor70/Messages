import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';





const IndexPage = () => {



    return (
        <Fragment>
            <div className="shield">
                <div className="front-name">
                    <Link to="/">Types</Link>
                </div>
                
                <div className="front-param">
                    <Link to="/sign-in">Log in</Link>
                </div>
                <div className="front-param">
                    <Link to="/sign-up">Make the account</Link>
                </div>
                

                <div className="front-param">
                    
                <h1>Meet Types, </h1>
                
                <p>You can communicate with anyone in any location with the reliability of texting and the richness of chat.</p> 
                <p>Connect with friends and family, shared photos, videos, GIFs, emoji, and more.
                Intuitive and modern, Types makes conversations easy, expressive, and fun.</p>
                <p>Nicolai's official MERN + redux + typescript app. </p>
                </div>
            
            
            </div>
        </Fragment>
    );
}
export default IndexPage;