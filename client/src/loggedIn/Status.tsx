import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import '../style/auth.css'


const Status = () => {

    

    return (
        <Fragment>
            <div className="front-name">
                <Link to="/">Types</Link>
            </div>
            
        </Fragment>
    );
}
export default connect(null, {})(withRouter(Status));