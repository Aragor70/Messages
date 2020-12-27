import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { update } from '../../store/actions/auth/auth';
import { acceptInvite, deleteInvite, updateInvite } from '../../store/actions/friend/invite';



const Invite = ({ user, id, updateInvite, deleteInvite, history, acceptInvite }: any) => {

    const { name, email, avatar } = user

    
    
    return (
        <Fragment>
            <div className="friends-row">
                
                
                <div className="avatar" onClick={e=> history.push(`/profile/${user._id}`)}>
                    <img src={avatar} />
                </div>
                <span className="name" onClick={e=> history.push(`/profile/${user._id}`)}>{name}</span>
                <div className="options">
                    
                    <button onClick={e=> acceptInvite(id, {accepted: true})}>accept</button>
                    <button onClick={e=> deleteInvite(id)}>deny</button>
                    
                </div>
                
            </div>
        </Fragment>
    );
}
export default connect(null, { updateInvite, deleteInvite, acceptInvite })(Invite);