import React, { Fragment } from 'react'



const Friend = ({ recipient, optionName, inviteMode=false }: any) => {

    const { name, email, avatar } = recipient

    
    return (
        <Fragment>
            <div className="friends-row">
                <div className="avatar">
                    <img src={avatar} />
                </div>
                <span className="name">{name}</span>
                {
                    inviteMode ? <Fragment>
                        <div className="options">
                            <button>accept</button>
                            <button>decline</button>
                        </div>
                    </Fragment> : <Fragment>
                        <div className="options">
                            <button>{optionName}</button>
                        </div>
                    </Fragment>
                }
                
            </div>
        </Fragment>
    );
}
export default Friend;