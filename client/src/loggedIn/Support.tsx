import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';


const Support = () => {

    

    return (
        <Fragment>
            <div className="support-content">
                <div className="support-header">
                    FAQ
                </div>
                <div className="support-header">
                    Contact
                </div>
                <div className="support-header">
                    Terms and Private Policy
                </div>
                <div className="support-header">
                    About us
                </div>





            </div>
            
        </Fragment>
    );
}
export default connect(null, {})(withRouter(Support));