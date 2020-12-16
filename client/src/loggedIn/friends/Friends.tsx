/* eslint-disable */
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Link, withRouter, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { deleteFriendship, getFriends, getFriendships, getUnknowns } from '../../store/actions/friend/friend';
import { cancelInvite, getInvites, getSentInvites, sendInvite } from '../../store/actions/friend/invite';


import '../../style/auth.css'
import photo from '../../style/photo.jpg'
import Friend from './Friend';
import Invite from './Invite';
import leftArrow from '../../style/icons/left-arrow2.png'
import { ifExists } from '../../utils/getDataFromArray';


export const Friends = ({ history, getUnknowns, recipient, getInvites, friend, getFriendships, getFriends, auth, getSentInvites, cancelInvite, sendInvite, deleteFriendship }: any) => {

    const [input, setInput] = useState(false)


    useEffect(() => {
        getFriendships()
        getFriends()
        getInvites()
        getSentInvites()
        return getUnknowns()
    }, [getUnknowns, getInvites, getFriendships, getFriends, getSentInvites])

    const [editMode, setEditMode] = useState(false)
    const [editFriend, setEditFriend] = useState<any>([])
    
    useEffect(() => {
        if (!editMode) {
            setEditFriend([])
        }
    }, [editMode])
    //console.log(friend.sentInvites ? friend.sentInvites.filter((invitation: any) => invitation.recipient._id === editFriend[0]._id)[0] : null)
    
    //console.log(editFriend[0] && editFriend[0]._id)
    
    return (
        <Fragment>
            <div className="friends-content">
                <Router>
                    {
                        editMode ? <Fragment>
                            <div className="edit-mode">
                                {
                                    ifExists(friend.friends, editFriend[0]) ? <Fragment>
                                            
                                            <span><img src={leftArrow} onClick={e=> setEditMode(!editMode)} className="img35" /></span><span><button>message</button></span><span><button onClick={e=> {deleteFriendship(editFriend[0]._id), setEditMode(false)}}>delete</button></span><span><button onClick={e=> history.push(`/profile/${editFriend[0]._id}`)}>view profile</button></span>
                                        </Fragment> : <Fragment>
                                            
                                            {
                                                !!friend.sentInvites.filter((invitation: any) => invitation.recipient._id === editFriend[0]._id || invitation.recipient === editFriend[0]._id)[0] ? <Fragment>

                                                    <span><img src={leftArrow} onClick={e=> setEditMode(!editMode)} className="img35" /></span><span><button onClick={e=> {cancelInvite(editFriend[0]._id), setEditMode(false)}}>cancel</button></span><span><button onClick={e=> history.push(`/profile/${editFriend[0]._id}`)}>view profile</button></span>
                                        
                                                </Fragment> : <Fragment>
                                                    
                                                    <span><img src={leftArrow} onClick={e=> setEditMode(!editMode)} className="img35" /></span><span><button onClick={e=> {sendInvite(editFriend[0]._id), setEditMode(false)}}>invite</button></span><span><button onClick={e=> history.push(`/profile/${editFriend[0]._id}`)}>view profile</button></span>
                                        
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
                        <div className="friends-header">
                            My friends
                        </div>
                        <div className="search-row">
                            <button onClick={e=>setInput(!input)}>search</button>
                            {
                                input && <input type="text" />
                            }
                            
                        </div>
                        {
                            friend.friends.length > 0 ? friend.friends.map((person: any) => <Friend key={person._id} recipient={person} setEditMode={setEditMode} editMode={editMode} sentInvites={friend.sentInvites} history={history} setEditFriend={setEditFriend} editFriend={editFriend} />) :  <div className="friends-row"><span className="empty">Invite your friends.</span></div>
                        }

                    </Route>

                    <Route exact path="/friends/invites">
                        <div className="friends-header">
                            Invites
                        </div>
                        <div className="search-row">
                            <button onClick={e=>setInput(!input)}>search</button>
                            {
                                input && <input type="text" />
                            }
                            
                        </div>
                        
                        {
                            friend.invites.length > 0 ? friend.invites.map((invite: any) => <Invite key={invite._id} user={invite.user} id={invite._id} history={history} />) : <div className="friends-row"><span className="empty">No new invites.</span></div>
                        }
                        
                    </Route>

                    <Route exact path="/friends/new-friends">
                        <div className="friends-header">
                            Find new friend
                        </div>
                        <div className="search-row">
                            <button onClick={e=>setInput(!input)}>search</button>
                            {
                                input && <input type="text" />
                            }
                            
                        </div>
                        {
                            friend.unknowns.length > 0 ? friend.unknowns.map((person: any) => <Friend key={person._id} recipient={person} setEditMode={setEditMode} editMode={editMode} sentInvites={friend.sentInvites} history={history} setEditFriend={setEditFriend} editFriend={editFriend} />) : <div className="friends-row"><span className="empty">No new users.</span></div>
                        }
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
export default connect(mapStateToProps, { getUnknowns, getInvites, getFriendships, getFriends, getSentInvites, cancelInvite, sendInvite, deleteFriendship })(withRouter(Friends));