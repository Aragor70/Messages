/* eslint-disable */
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Link, withRouter, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { deleteFriendship, getFriends, getFriendships, getUnknowns } from '../../store/actions/friend/friend';
import { cancelInvite, getInvites, getSentInvites, sendInvite } from '../../store/actions/friend/invite';
import io from 'socket.io-client';

import '../../style/auth.css'
import photo from '../../style/photo.jpg'
import Friend from './Friend';
import Invite from './Invite';
import leftArrow from '../../style/icons/left-arrow2.png'
import { ifExists } from '../../utils/getDataFromArray';
import List from './List';
import { getFromInvite, getFromMessenger } from '../../store/actions/notification/notification';
import { deleteSocketMessage, getSocketMessage } from '../../store/actions/messenger/connection';

let socket: any;
export const Friends = ({ history, getUnknowns, recipient, getInvites, friend, getFromInvite, getFriendships, getFriends, auth, getSentInvites, cancelInvite, sendInvite, deleteFriendship, getFromMessenger, deleteSocketMessage, getSocketMessage }: any) => {

    const [input, setInput] = useState(false)


    useEffect(() => {
        getFriendships()
        getFriends()
        getInvites()
        getSentInvites()
        getUnknowns()

    }, [getUnknowns, getInvites, getFriendships, getFriends, getSentInvites])

    const [editMode, setEditMode] = useState(false)
    const [editFriend, setEditFriend] = useState<any>([])
    

    useEffect(() => {
        if (!editMode) {
            setEditFriend([])
        }
    }, [editMode])



    return (
        <Fragment>
            <div className="friends-content">
                <Router>
                    {
                        editMode ? <Fragment>
                            <div className="edit-mode">
                                {
                                    ifExists(friend.friends, editFriend[0]) ? <Fragment>
                                            
                                            <span><img src={leftArrow} onClick={e=> setEditMode(!editMode)} className="img35" /></span><span><button onClick={e=> history.push(`/messenger/${editFriend[0]._id}`)}>message</button></span><span><button onClick={e=> {deleteFriendship(editFriend[0]._id, socket), setEditMode(false)}}>delete</button></span><span><button onClick={e=> history.push(`/profile/${editFriend[0]._id}`)}>view profile</button></span>
                                        </Fragment> : <Fragment>
                                            
                                            {
                                                !!friend.sentInvites.filter((invitation: any) => invitation.recipient._id == editFriend[0]._id || invitation.recipient == editFriend[0]._id)[0] ? <Fragment>

                                                    <span><img src={leftArrow} onClick={e=> setEditMode(!editMode)} className="img35" /></span><span><button onClick={e=> {cancelInvite(editFriend[0]._id, socket), setEditMode(false)}}>cancel</button></span><span><button onClick={e=> history.push(`/profile/${editFriend[0]._id}`)}>view profile</button></span>
                                        
                                                </Fragment> : <Fragment>
                                                    
                                                    <span><img src={leftArrow} onClick={e=> setEditMode(!editMode)} className="img35" /></span><span><button onClick={e=> {sendInvite(editFriend[0]._id, socket), setEditMode(false)}}>invite</button></span><span><button onClick={e=> history.push(`/profile/${editFriend[0]._id}`)}>view profile</button></span>
                                        
                                                </Fragment>
                                            }
                                        </Fragment>
                                }
                                
                            </div>
                        </Fragment> : <Fragment>
                            <div className="friends-navs">
                                <Link to="/friends"><button>friends</button></Link>
                                <Link to="/friends/invites"><button>invites</button></Link>
                                <Link to="/friends/new-friends"><button>find new</button></Link>
                            </div>
                        </Fragment>
                    }
                
                <Switch>
                    
                    
                    <Route exact path="/friends">
                        
                        <List pageTitle="My friends" getOnLoad={getFriends} friend={friend} array={friend.friends} Component={Friend} ifEmpty="Invite your friends." input={input} setInput={setInput} setEditMode={setEditMode} editMode={editMode} setEditFriend={setEditFriend} editFriend={editFriend} history={history} />
                        
                    </Route>

                    <Route exact path="/friends/invites">

                        <List pageTitle="Invites" getOnLoad={getInvites} friend={friend} array={friend.invites} Component={Invite} ifEmpty="No new invites." input={input} setInput={setInput} setEditMode={setEditMode} editMode={editMode} setEditFriend={setEditFriend} editFriend={editFriend} history={history} socket={socket} />
                        
                    </Route>

                    <Route exact path="/friends/new-friends">
                        
                        <List pageTitle="Find new friend" getOnLoad={getUnknowns} friend={friend} array={friend.unknowns} Component={Friend} ifEmpty="No new users." input={input} setInput={setInput} setEditMode={setEditMode} editMode={editMode} setEditFriend={setEditFriend} editFriend={editFriend} history={history} />
                        
                    </Route>


                </Switch>
                

                <hr />
               
                </Router>
            </div>
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    recipient: state.recipient,
    friend: state.friend,
    auth: state.auth
})
export default connect(mapStateToProps, { getUnknowns, getInvites, getFriendships, getFriends, getFromInvite, getSentInvites, cancelInvite, sendInvite, deleteFriendship, getFromMessenger, deleteSocketMessage, getSocketMessage })(withRouter(Friends));