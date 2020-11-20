import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Alert from '../utils/alert';

import '../style/auth.css'


const Notifications = ({}: any) => {

    

    return (
        <Fragment>
            <div className="front-name">
                <Link to="/">Types</Link>
            </div>
            <Alert />
            
        </Fragment>
    );
}
export default connect(null, {})(withRouter(Notifications));