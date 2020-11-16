import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import IndexPage from './loggedOff/IndexPage';
import { setAlert } from './store/actions/alert/alert';
import './style/header.css'
import './style/output.css'
import './style/frontVisitor.css'
import Login from './auth/login';
import Register from './auth/register';
import Alert from './utils/alert';
import { AuthType } from './store/actions/auth/types';
import setAuthToken from './utils/setAuthToken';
import { loadUser, logout } from './store/actions/auth/auth';
import Menu from './Menu';

import menuBtn from './style/menu.png'

interface AppType<X> {
  logout: X
}

type Props = {
  auth: AuthType,
  logout: () => void,
  loadUser: () => void,
  setAlert: (message: string, alertType: string) => void
  
  
}
const App = ({ loadUser, setAlert, logout, auth }: Props) => {
  
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
      return loadUser();
    }
  }, [loadUser])

  const [menu, setMenu] = useState<boolean>(false)

  console.log(menu)

  return (
    <Fragment>
      <Router>
        <header className="header">
          <div className="webName"><Link to="/">Types</Link></div>
          <div className="menu-button">
            
            <img src={menuBtn} alt="menu" height="45px" onClick={e=> setMenu(!menu)} />
            
          </div>
        </header>
        
        {
          menu && <Fragment><Menu auth={auth} setMenu={setMenu} /> <div className="shadow"></div></Fragment>
        }
        
        <main className="output">
          {
            auth.isAuthenticated ? <Fragment>

            </Fragment> : <Fragment>
              <Route exact path="/">
              
              <IndexPage />
              <Alert />

              </Route>
              
            </Fragment>
          }
          

          <Route exact path="/sign-in">
            <Login />
            
          </Route>
          <Route exact path="/sign-up">
            <Register />
            
          </Route>
        </main>
      </Router>
    </Fragment>
  );
}
const mapStateToProps = (state: any) => ({
  alert: state.alert,
  auth: state.auth
})
export default connect(mapStateToProps, {setAlert, loadUser, logout})(App);