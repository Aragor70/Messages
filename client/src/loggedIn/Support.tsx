import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import '../style/auth.css'


const Support = () => {

    

    return (
        <Fragment>
            <div className="front-name">
                <Link to="/">Support</Link>
            </div>
            
        </Fragment>
    );
}
export default connect(null, {})(withRouter(Support));