import React, { Fragment, useEffect, useState } from 'react';




const List = ({ pageTitle, getOnLoad, array, Component, ifEmpty, input, setInput, friend, setEditMode, editMode, setEditFriend, editFriend, history, socket }: any) => {

    const [searchValue, setSearchValue] = useState('')
    const [searched, setSearched] = useState<any>([])

    useEffect(() => {
        getOnLoad()

        return () => {
            setSearched([])
            setSearchValue('')
            setInput(false)
        }
    }, [getOnLoad])
    
    
    useEffect(() => {
        if (searchValue.length > 0) {
        setSearched(array.filter((person: any) => person.name.toLowerCase().includes(searchValue.toLowerCase())))
        }
        
    }, [searchValue])
    
    return (
        <Fragment>
            <div className="friends-header">
                {pageTitle}
            </div>
            <div className="search-row">
                <button onClick={e=>setInput(!input)}>search</button>
                {
                    input && <input type="text" value={searchValue} onChange={e=> setSearchValue(e.target.value)} />
                }
                
            </div>
            {
                searchValue.length > 0 ? searched.map((person: any) => <Component key={person._id} recipient={person} invite={person} setEditMode={setEditMode} editMode={editMode} sentInvites={friend.sentInvites} history={history} setEditFriend={setEditFriend} editFriend={editFriend} socket={socket} />) : array.length > 0 ? array.map((person: any) => <Component key={person._id} recipient={person} invite={person} setEditMode={setEditMode} editMode={editMode} sentInvites={friend.sentInvites} history={history} setEditFriend={setEditFriend} editFriend={editFriend} socket={socket} />) :  <div className="friends-row"><span className="empty">{ifEmpty}</span></div>
            }
        </Fragment>
    );
}
export default List;