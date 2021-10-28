import React,{ Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setAlert } from './store/actions/alert/alert';
import './style/noMatch.css';

const NoMatch = ({ history, auth, setAlert, location }: any) => {
    
    useEffect(() => {
        if (auth.isAuthenticated && (location.pathname === '/sign-in' || location.pathname === '/sign-up')) {
            setAlert('You are already logged in.', 'success')
            return history.push('/');
        }
    }, [auth])

    useEffect(() => {
        if (location.pathname === '/login') return history.push('/sign-in');
        if (location.pathname === '/register') return history.push('/sign-up');
    }, [location])

    return (
      <Fragment>
        <div className="page-not-found">
            <h1>404, Page not found.</h1>
            
        </div>
        
      </Fragment>
    )
}
const mapStateToProps = (state: any) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { setAlert })(withRouter(NoMatch));