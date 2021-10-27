/* eslint-disable */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './style/menu.css'
import { setAlert } from './store/actions/alert/alert';
import { logout } from './store/actions/auth/auth';
import WebName from './style/types.png';

import friendsBtn from './style/icons/friends.png';
import settingsBtn from './style/icons/settings.png';
import supportBtn from './style/icons/support.png';
import logoutBtn from './style/icons/log-out2.png';
import loginBtn from './style/icons/log-in1.png';
import signupBtn from './style/icons/register.png';

const MenuUser = ({ history, setMenu, logout, auth }: any) => {

  return (
    <Fragment>
      <nav className="navigate">
        <h1><img alt="Webname" src={WebName} onClick={e=> {history.push('/'), setMenu(false)}} /></h1>
        
        <button type="button" className="navigate-button" onClick={e=> {history.push('/friends'), setMenu(false)}}>
          <img alt="friends" src={friendsBtn} style={{width: '45px'}} />&nbsp; friends
        </button>
        
        <button type="button" className="navigate-button" onClick={e=> {history.push('/profile'), setMenu(false)}}>
          <img alt="profile" src={auth.user.avatar} style={{width: '45px'}} />&nbsp; profile
        </button>
        <button type="button" className="navigate-button" onClick={e=> {history.push('/settings'), setMenu(false)}}>
          <img alt="settings" src={settingsBtn} style={{width: '45px'}} />&nbsp; settings
        </button>
        <button type="button" className="navigate-button" onClick={e=> {history.push('/support'), setMenu(false)}}>
          <img alt="support" src={supportBtn} style={{width: '45px'}} />&nbsp; support
        </button>
        <button type="button" className="navigate-button" onClick={e=> {setMenu(false), logout(history)}}>
          <img alt="logout" src={logoutBtn} style={{width: '45px'}} />&nbsp; logout
        </button>
      </nav>
    </Fragment>
  )
}

const MenuNoUser = ({ history, setMenu }: any) => {

  return (
    <Fragment>
      <nav className="navigate">
        <h1>The Types</h1>
        <button type="button" className="navigate-button" onClick={e=> {history.push('/sign-in'), setMenu(false)}}>
          <img src={loginBtn} style={{width: '45px'}} />&nbsp; log in
        </button>
        <button type="button" className="navigate-button" onClick={e=> {history.push('/sign-up'), setMenu(false)}}>
          <img src={signupBtn} style={{width: '40px'}} />&nbsp; sign up
        </button>
      </nav>
    </Fragment>
  )
}

const Menu = ({ history, auth, setMenu, logout }: any) => {


    return (
        <Fragment>
          <div className="menu">
          {
            auth.isAuthenticated ? <MenuUser history={history} setMenu={setMenu} logout={logout} auth={auth} /> : <MenuNoUser history={history} setMenu={setMenu} logout={logout} />
          }
          </div> 
        </Fragment>
    );
}
export default connect(null, { logout })(withRouter(Menu));






