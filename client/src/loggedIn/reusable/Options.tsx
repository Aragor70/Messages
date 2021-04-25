/* eslint-disable */
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';


const MsgNavOpt = ({ user, recipient, history, setIsSearch, setMsgNavOpt }: any) => {
    
    return (
        <div className="options-content msg-nav-opt">
            <div className="options-header" onClick={e=> history.push(`/profile/${recipient}`)}>
                View Profile
            </div>
            <div className="options-header" onClick={e=> {setIsSearch(true), setMsgNavOpt(false)}}>
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

const Options = ({ user, recipient, msgNavOpt=false, setMsgNavOpt, history, setIsSearch }: any) => {

    
    return (
        <Fragment>
            {
                <div className="shadow" style={{ zIndex: 2, opacity: 0.1 }} onClick={e=> setMsgNavOpt(false)}></div>
            }
            {
                msgNavOpt && <MsgNavOpt user={user} recipient={recipient} history={history} setIsSearch={setIsSearch} setMsgNavOpt={setMsgNavOpt} />
            }
            
            
        </Fragment>
    );
}
export default connect(null, {})(withRouter(Options));