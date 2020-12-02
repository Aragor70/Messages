import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import '../style/auth.css'
import photo from '../style/photo.jpg'


export const Friends = ({ history }: any) => {

    const [input, setInput] = useState(false)

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

                        <div className="friends-row">
                            <div className="avatar">
                                <img src={photo} />
                            </div>
                            <span className="name">Bambino :</span>
                            <span className="status">Offline</span>
                            <div className="options">
                                <button>options</button>
                            </div>
                        </div>

                        <div className="friends-row">
                            <div className="avatar">
                                <img src={photo} />
                            </div>
                            <span className="name">Bambino :</span>
                            <span className="status">Offline</span>
                            <div className="options">
                                <button>options</button>
                            </div>
                        </div>
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
                        <div className="friends-row">
                            <div className="avatar">
                                <img src={photo} />
                            </div>
                            <span className="name">Bambino</span>
                            <div className="options">
                                <button>invite</button>
                            </div>
                        </div>
                        <div className="friends-row">
                            <div className="avatar">
                                <img src={photo} />
                            </div>
                            <span className="name">Bambino</span>
                            <div className="options">
                                <button>invite</button>
                            </div>
                        </div>
                    </Route>


                </Switch>
                

                <hr />
               
                </Router>
            </div>
        </Fragment>
    );
}
export default connect(null, { })(withRouter(Friends));