import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
import { update } from '../../store/actions/auth/auth';
import { deleteInvite, updateInvite } from '../../store/actions/friend/invite';



const Invite = ({ user, id, updateInvite, deleteInvite }: any) => {

    const { name, email, avatar } = user

    
    
    return (
        <Fragment>
            <div className="friends-row">
                
                
                <div className="avatar">
                    <img src={avatar} />
                </div>
                <span className="name">{name}</span>
                <div className="options">
                    
                    <button onClick={e=> updateInvite(id, {accepted: true})}>accept</button>
                    <button onClick={e=> deleteInvite(id)}>decline</button>
                    
                </div>
                
            </div>
        </Fragment>
    );
}
export default connect(null, { updateInvite, deleteInvite })(Invite);