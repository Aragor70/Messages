import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Alert from '../utils/alert';

import '../style/auth.css'


const Profile = ({}: any) => {

    

    return (
        <Fragment>
            <div className="front-name">
                Profile
            </div>
            <Alert />
            
        </Fragment>
    );
}
export default connect(null, {})(withRouter(Profile));