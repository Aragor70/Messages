import React, { Fragment, useEffect } from 'react';




const List = ({ pageTitle, getOnLoad, array, Component, ifEmpty, input, setInput, friend, setEditMode, editMode, setEditFriend, editFriend, history }: any) => {

    useEffect(() => {
        getOnLoad()
    }, [getOnLoad])

    return (
        <Fragment>
            <div className="friends-header">
                {pageTitle}
            </div>
            <div className="search-row">
                <button onClick={e=>setInput(!input)}>search</button>
                {
                    input && <input type="text" />
                }
                
            </div>
            {
                array.length > 0 ? array.map((person: any) => <Component key={person._id} recipient={person} setEditMode={setEditMode} editMode={editMode} sentInvites={friend.sentInvites} history={history} setEditFriend={setEditFriend} editFriend={editFriend} />) :  <div className="friends-row"><span className="empty">{ifEmpty}</span></div>
            }
        </Fragment>
    );
}
export default List;