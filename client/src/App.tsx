import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import FrontPage from './visitor/FrontPage';
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


  return (
    <Fragment>
      <Router>
        <header className="header">
          <div className="webName"><Link to="/">Types</Link></div>
          <div className="logout" onClick={e=>logout()}>logout</div>
        </header>
        {
          auth.isAuthenticated ? null : <Fragment>
            <nav className="navigate">
              <h1>The Types</h1>
              <button type="button" className="navigate-button">
                log in
              </button>
              <button type="button" className="navigate-button">
                sign up
              </button>
            </nav>
          </Fragment>
        }
        
        <main className="output">
          {
            auth.isAuthenticated ? <Fragment>

            </Fragment> : <Fragment>
              <Route exact path="/">
              
              <FrontPage />
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