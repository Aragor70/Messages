/* eslint-disable */
import React, { Fragment, useEffect, useState } from 'react'
import { ifExists } from '../../utils/getDataFromArray'



const Friend = ({ recipient, editMode, setEditMode, sentInvites, history, setEditFriend, editFriend }: any) => {

    const { name, email, avatar } = recipient

    const [isInvited, setInvited] = useState(false)
    useEffect(() => {
        if (sentInvites) {
            
            return setInvited(!!sentInvites.filter((invite: any) => invite.recipient._id == recipient._id || invite.recipient == recipient._id )[0])
        }
        
    }, [sentInvites])
    console.log(sentInvites)
    const handleOption = () => {
        if (editMode === true) {
            setEditMode(false);
            setEditFriend([]);
        } else {
            setEditMode(true);
            setEditFriend([...editFriend, recipient]);
        }
    }
    
    return (
        <Fragment>
            <div className="friends-row" style={ editFriend[0] && editFriend[0]._id === recipient._id ? { backgroundColor: 'red' } : { } }>
                
                <div className="avatar" onClick={e=> history.push(`profile/${recipient._id}`)}>
                    <img src={avatar} />
                </div>
                <span className="name" onClick={e=> history.push(`profile/${recipient._id}`)}>{name}</span>
                <div className="options">
                    <button onClick={e=> handleOption()}>{isInvited ? "pending..." : "options"}</button>
                </div>
                    
            </div>
        </Fragment>
    );
}
export default Friend;