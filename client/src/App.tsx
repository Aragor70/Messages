import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch, RouteComponentProps, withRouter } from 'react-router-dom';
import IndexPage from './loggedOff/IndexPage';
import './style/header.css'
import './style/output.css'
import './style/frontVisitor.css'
import './style/headerLoggedIn.css'
import './style/profile.css';
import './style/notifications.css';
import './style/friends.css';
import './style/settings.css';
import './style/messenger.css';
import './style/support.css';
import './style/options.css';
import './style/update.css';

import Login from './auth/login';
import Register from './auth/register';
import Alert from './utils/alert';
import { AuthType } from './store/actions/auth/types';
import setAuthToken from './utils/setAuthToken';
import { loadUser  } from './store/actions/auth/auth';
import Menu from './Menu';

import menuBtn from './style/menu.png'
import IndexUser from './loggedIn/IndexUser';
import Profile from './loggedIn/profile/Profile';
import Status from './loggedIn/Status';
import Friends from './loggedIn/friends/Friends';
import Notifications from './loggedIn/Notifications';
import Settings from './loggedIn/Settings';
import NoMatch from './NoMatch';

import WebName from './style/types.png';

import photo from './style/photo.jpg'
import leftArrow from './style/icons/left-arrow2.png'
import Messenger from './loggedIn/Messenger';
import Support from './loggedIn/Support';
import Recipient from './loggedIn/profiles/Recipient';
import Header from './loggedIn/Header';

type Props = {
  auth: AuthType,
  history: RouteComponentProps,
  loadUser: () => void
}



const App = ({ loadUser, auth, history, match }: any) => {
  
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
      return loadUser();
    } 
  }, [loadUser])

  const [menu, setMenu] = useState<boolean>(false)
  const [titlePage, setTitlePage] = useState('messenger')


  return (
    <Fragment>
        {
          auth.isAuthenticated ? <Fragment>
            <Header history={history} auth={auth} titlePage={titlePage} setMenu={setMenu} menu={menu} match={match} />
            
          </Fragment> : <Fragment>
            <header className="header" >
              <div className="webName">
                <Link to="/" ><img src={WebName} /></Link>
              </div>
              <div className="menu-button">
                
                <img src={menuBtn} alt="menu" height="45px" onClick={e=> setMenu(!menu)} />
                
              </div>
            </header>
          </Fragment>
        }
        
        
        {
          menu && <Fragment><Menu auth={auth} setMenu={setMenu} /> <div className="shadow" onClick={e=> setMenu(false)}></div></Fragment>
        }
        
        <main className="output" style={ auth.isAuthenticated ? { marginTop: '0' } : { marginTop : '9vh', width: '100%' }}>
          {
            auth.isAuthenticated ? <Fragment>
              <Switch>
              
              <Route exact path="/">
                <IndexUser setMenu={setMenu} menu={menu} />
                <Alert />
              </Route>

              <Route exact path="/status">
              
                <Status />
                <Alert />

              </Route>

              <Route exact path="/friends">
              
                <Friends />
                <Alert />

              </Route>

              <Route exact path="/notifications">
              
                <Notifications />
                <Alert />

              </Route>


              <Route exact path="/settings">
              
                <Settings />
                <Alert />

              </Route>

              <Route exact path="/profile">
                
                <Profile />
                <Alert />

              </Route>
              <Route exact path="/messenger/:id">
                
                <Messenger />
                <Alert />

              </Route>
              <Route exact path="/profile/:id">
                
                <Recipient />
                <Alert />

              </Route>

              <Route exact path="/support">
                
                <Support />
                <Alert />

              </Route>
              
              <Route>
                <NoMatch />
              </Route>

              </Switch>
            </Fragment> : <Fragment>
              <Switch>
              <Route exact path="/">
              
                <IndexPage />
                <Alert />

              </Route>
              <Route exact path="/sign-in">
                <Login />
                <Alert />
              </Route>
              <Route exact path="/sign-up">
                <Register />
                <Alert />
              </Route>
              
              <Route component={NoMatch} />
              
              </Switch>
            </Fragment>
          }
          
        </main>
      
    </Fragment>
  );
}
const mapStateToProps = (state: any) => ({
  alert: state.alert,
  auth: state.auth
})
export default connect(mapStateToProps, { loadUser })(withRouter(App));