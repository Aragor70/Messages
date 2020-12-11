import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';


const MsgNavOpt = ({ user, recipient, history }: any) => {
    
    return (
        <div className="options-content msg-nav-opt">
            <div className="options-header" onClick={e=> history.push(`/profile/${recipient._id}`)}>
                View Profile
            </div>
            <div className="options-header">
                Search
            </div>
            
            <div className="options-header">
                Design
            </div>
            <div className="options-header">
                Hold the talk
            </div>
            <div className="options-header">
                Block a member
            </div>
        </div>
    )
}

const Options = ({ user, recipient, msgNavOpt=false, setMsgNavOpt, history }: any) => {

    
    return (
        <Fragment>
            {
                <div className="shadow" style={{ zIndex: 2, opacity: 0.1 }} onClick={e=> setMsgNavOpt(false)}></div>
            }
            {
                msgNavOpt && <MsgNavOpt user={user} recipient={recipient[0]} history={history} />
            }
            
            
        </Fragment>
    );
}
export default connect(null, {})(withRouter(Options));