import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';


import '../style/auth.css'


export const Friends = () => {

    

    return (
        <Fragment>
            <div className="front-name">
                <Link to="/">Types</Link>
            </div>
            
            
        </Fragment>
    );
}
export default connect(null, { })(withRouter(Friends));