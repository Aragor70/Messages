import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import '../style/auth.css'


const Settings = () => {

    

    return (
        <Fragment>
            <div className="front-name">
                Settings
            </div>
            
        </Fragment>
    );
}
export default connect(null, {})(withRouter(Settings));