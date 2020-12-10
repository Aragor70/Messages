import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Link, withRouter, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getFriends, getFriendships } from '../../store/actions/friend/friend';
import { getInvites } from '../../store/actions/friend/invite';
import { getRecipients } from '../../store/actions/recipient/recipient';


import '../../style/auth.css'
import photo from '../../style/photo.jpg'
import Friend from './Friend';
import Invite from './Invite';


export const Friends = ({ history, getRecipients, recipient, getInvites, friend, getFriendships, getFriends, auth }: any) => {

    const [input, setInput] = useState(false)


    useEffect(() => {
        getFriendships()
        getFriends()
        getInvites()
        return getRecipients()
    }, [getRecipients, getInvites, getFriendships, getFriends])

    

    return (
        <Fragment>
            <div className="friends-content">
                <Router>
                <div className="friends-navs">
                    <Link to="/friends"><button>friends</button></Link>
                    <Link to="/friends/invites"><button>invites</button></Link>
                    <Link to="/friends/new-friends"><button>find new</button></Link>
                </div>
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
                            friend.friends.map((person: any) => <Friend key={person._id} recipient={person} />)
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
                            friend.invites.map((invite: any) => <Invite key={invite._id} user={invite.user}  />)
                        }
                        <div className="friends-row">
                            <div className="avatar">
                                <img src={photo} />
                            </div>
                            <span className="name">Bambino :</span>
                            <span className="status">Offline</span>
                            <div className="options">
                                <button>accept</button>
                                <button>decline</button>
                            </div>
                        </div>
                        <div className="friends-row">
                            <div className="avatar">
                                <img src={photo} />
                            </div>
                            <span className="name">Bambino :</span>
                            <span className="status">Offline</span>
                            <div className="options">
                                <button>accept</button>
                                <button>decline</button>
                            </div>
                        </div>
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
                            recipient.recipients.map((person: any) => <Friend key={person._id} recipient={person}/>)
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
export default connect(mapStateToProps, { getRecipients, getInvites, getFriendships, getFriends })(withRouter(Friends));