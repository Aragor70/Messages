import React, { Fragment } from 'react'



const Invite = ({ user, optionName }: any) => {

    const { name, email, avatar } = user

    
    return (
        <Fragment>
            <div className="friends-row">
                
                
                <div className="avatar">
                    <img src={avatar} />
                </div>
                <span className="name">{user.name}</span>
                <div className="options">
                    <button>accept</button>
                    <button>decline</button>
                </div>
                
            </div>
        </Fragment>
    );
}
export default Invite;