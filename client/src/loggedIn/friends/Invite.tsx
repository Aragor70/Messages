import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { acceptInvite, deleteInvite } from '../../store/actions/friend/invite';



const Invite = ({ invite, deleteInvite, history, acceptInvite, socket }: any) => {

    
    return (
        <Fragment>
            <div className="friends-row">
                
                
                <div className="avatar" onClick={e=> history.push(`/profile/${invite.user._id}`)}>
                    <img src={invite.user.avatar} />
                </div>
                <span className="name" onClick={e=> history.push(`/profile/${invite.user._id}`)}>{invite.user.name}</span>
                <div className="options">
                    
                    <button onClick={e=> acceptInvite(invite._id, {accepted: true}, socket)}>accept</button>
                    <button onClick={e=> deleteInvite(invite._id, socket)}>deny</button>
                    
                </div>
                
            </div>
        </Fragment>
    );
}
export default connect(null, { deleteInvite, acceptInvite })(Invite);