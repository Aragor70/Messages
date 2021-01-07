/* eslint-disable */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './style/menu.css'
import { setAlert } from './store/actions/alert/alert';
import { logout } from './store/actions/auth/auth';
import WebName from './style/types.png';


const MenuUser = ({ history, setMenu, logout }: any) => {

  return (
    <Fragment>
      <nav className="navigate">
        <h1><img src={WebName} onClick={e=> {history.push('/'), setMenu(false)}} /></h1>
        
        <button type="button" className="navigate-button" onClick={e=> {history.push('/friends'), setMenu(false)}}>
          friends
        </button>
        <hr />
        <span className="navigate-header">account</span>
        <button type="button" className="navigate-button" onClick={e=> {history.push('/profile'), setMenu(false)}}>
          profile
        </button>
        <button type="button" className="navigate-button" onClick={e=> {history.push('/settings'), setMenu(false)}}>
          settings
        </button>
        <button type="button" className="navigate-button" onClick={e=> {history.push('/support'), setMenu(false)}}>
          support
        </button>
        <button type="button" className="navigate-button" onClick={e=> {setMenu(false), logout(history)}}>
          logout
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
          log in
        </button>
        <button type="button" className="navigate-button" onClick={e=> {history.push('/sign-up'), setMenu(false)}}>
          sign up
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
            auth.isAuthenticated ? <MenuUser history={history} setMenu={setMenu} logout={logout} /> : <MenuNoUser history={history} setMenu={setMenu} logout={logout} />
          }
          </div> 
        </Fragment>
    );
}
export default connect(null, { logout })(withRouter(Menu));






