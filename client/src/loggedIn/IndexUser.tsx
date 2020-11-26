import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import '../style/messages.css'

import '../style/indexUser.css'


export const IndexUser = () => {

    

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

                    <div className="recipient-content">
                        <div className="messenger"><div className="avatar">img</div><span className="name"><span>Bambino</span><span className="status" >: *</span></span>
                        <span className="message"><span className="text">A start-up in Manchester have just received a huge amount of investment to scale-up their platform and we're looking for the industries top tier talent to drive their product forward!</span><span className="status">*</span></span>
                        </div>
                        <span className="time">time</span>
                    </div>
                    <hr />
                    <div className="recipient-content">
                        <div className="messenger"><div className="avatar">img</div><span className="name"><span>Bambino</span><span className="status" >: *</span></span>
                        <span className="message"><span className="text">A start-up in Manchester have just received a huge amount of investment to scale-up their platform and we're looking for the industries top tier talent to drive their product forward!</span><span className="status">*</span></span>
                        </div>
                        <span className="time">time</span>
                    </div>
                    
                </div>
            </div>
        </Fragment>
    );
}
export default connect(null, { })(withRouter(IndexUser));