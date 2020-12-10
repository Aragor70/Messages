import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

const Confirm = ({ onChange, handleSubmit, setNext, mode, inputName, inputType='text' }: any) => {


    return (
        <Fragment>
            <form onSubmit={e=> handleSubmit(e, setNext)} className="update-content">
                <div className="update-header">
                    {
                        mode === 'confirm' && <span>Confirm your password</span>
                    }
                    {
                        mode === 'email-update' && <span>What is your new e-mail address?</span>
                    }
                    {
                        mode === 'password-update' && <span>What is your new password?</span>
                    }

                </div>
                <div className="update-header">
                    <span><input type={inputType} name={inputName} onChange={e=> onChange(e)} required /></span><span><button type="submit">confirm</button></span>
                </div>
            </form>
        </Fragment>
    );
}
export default connect(null, {  })(withRouter(Confirm));