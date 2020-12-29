import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { update } from '../../store/actions/auth/auth';
import { acceptInvite, deleteInvite, updateInvite } from '../../store/actions/friend/invite';



const Invite = ({ invite, id, updateInvite, deleteInvite, history, acceptInvite, socket }: any) => {

    console.log(invite)
    
    return (
        <Fragment>
            <div className="friends-row">
                
                
                <div className="avatar" onClick={e=> history.push(`/profile/${invite.user._id}`)}>
                    <img src={invite.user.avatar} />
                </div>
                <span className="name" onClick={e=> history.push(`/profile/${invite.user._id}`)}>{invite.user.name}</span>
                <div className="options">
                    
                    <button onClick={e=> acceptInvite(invite._id, {accepted: true})}>accept</button>
                    <button onClick={e=> deleteInvite(invite._id, socket)}>deny</button>
                    
                </div>
                
            </div>
        </Fragment>
    );
}
export default connect(null, { updateInvite, deleteInvite, acceptInvite })(Invite);