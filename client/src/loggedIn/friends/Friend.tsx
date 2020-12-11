import React, { Fragment } from 'react'



const Friend = ({ recipient }: any) => {

    const { name, email, avatar } = recipient

    
    return (
        <Fragment>
            <div className="friends-row">
                
                <div className="avatar">
                    <img src={avatar} />
                </div>
                <span className="name">{name}</span>
                <div className="options">
                    <button>options</button>
                </div>
                    
            </div>
        </Fragment>
    );
}
export default Friend;