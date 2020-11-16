/* eslint-disable */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './style/menu.css'
import { setAlert } from './store/actions/alert/alert';


const MenuUser = ({ history, setMenu }: any) => {

  return (
    <Fragment>
      <nav className="navigate">
        <h1>The Types</h1>
        <button type="button" className="navigate-button" onClick={e=> {history.push('/sign-up'), setMenu(false)}}>
          status
        </button>
        <button type="button" className="navigate-button" onClick={e=> {history.push('/sign-up'), setMenu(false)}}>
          friends
        </button>
        <button type="button" className="navigate-button" onClick={e=> {history.push('/sign-up'), setMenu(false)}}>
          notifications
        </button>
        <button type="button" className="navigate-button" onClick={e=> {history.push('/sign-up'), setMenu(false)}}>
          do not disturb
        </button>
        <hr />
        <span>account</span>
        <button type="button" className="navigate-button" onClick={e=> {history.push('/sign-in'), setMenu(false)}}>
          profile
        </button>
        <button type="button" className="navigate-button" onClick={e=> {history.push('/sign-up'), setMenu(false)}}>
          settings
        </button>
        <button type="button" className="navigate-button" onClick={e=> {history.push('/sign-up'), setMenu(false)}}>
          support
        </button>
        <button type="button" className="navigate-button" onClick={e=> {history.push('/sign-up'), setMenu(false)}}>
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

const Menu = ({ history, setAlert, auth, setMenu }: any) => {


    return (
        <Fragment>
          <div className="menu">
          {
            auth.isAuthenticated ? <MenuUser history={history} setMenu={setMenu} /> : <MenuNoUser history={history} setMenu={setMenu} />
          }
          </div> 
        </Fragment>
    );
}
export default connect(null, { setAlert })(withRouter(Menu));






