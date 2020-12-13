import React, { Fragment, useEffect, useState } from 'react'
import { ifExists } from '../../utils/getDataFromArray'



const Friend = ({ recipient, editMode, setEditMode, friends, history }: any) => {

    const { name, email, avatar } = recipient

    const [isFriend, setIsFriend] = useState(false)
    useEffect(() => {
        
        return setIsFriend(ifExists(friends, recipient))
    }, [])
    
    
    return (
        <Fragment>
            <div className="friends-row">
                
                <div className="avatar" onClick={e=> history.push(`profile/${recipient._id}`)}>
                    <img src={avatar} />
                </div>
                <span className="name" onClick={e=> history.push(`profile/${recipient._id}`)}>{name}</span>
                <div className="options">
                    <button onClick={e=> setEditMode(!editMode)}>options</button>
                </div>
                    
            </div>
        </Fragment>
    );
}
export default Friend;