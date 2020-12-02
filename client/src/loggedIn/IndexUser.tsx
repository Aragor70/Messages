import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../style/messages.css'

import '../style/indexUser.css'

import photo from '../style/photo.jpg'


export const IndexUser = ({ auth, setMenu, menu }: any) => {

    const { avatar, name, status } = auth.user
    

    return (
        <Fragment>
            <div className="messages-content">
                
                
                <div className="messages-box">

                    <div className="recipient-content">
                        <div className="messenger"><div className="avatar"><img src={photo} height="35px" width="35px" /></div><div className="msg-head"><span>Bambino : </span><span className="status" >Offline</span><div className="time">28.11</div></div>
                        <div className="message"><span className="text">A start-up in Manchester have just received a huge amount of investment to scale-up their platform and we're looking for the industries top tier talent to drive their product forward!</span><span className="status">*</span></div>
                        </div>
                        
                    </div>
                    <hr />
                    
                    
                </div>
            </div>
        </Fragment>
    );
}
const mapStateToProps = (state:any) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { })(withRouter(IndexUser));