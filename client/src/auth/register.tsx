import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { register } from '../store/actions/auth/auth';
import { RegisterUserType } from '../store/actions/auth/types';

import '../style/auth.css'


const Register = ({ register, history }: any) => {

    const [formData, setFormData] = useState<RegisterUserType>({
        name: null,
        email: null,
        password: null,
        passwordConfirmation: null
    })
    const { name, email, password, passwordConfirmation } = formData;

    const handleTyping = (e: { target: HTMLInputElement }) => {
        
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('run')
        return await register(formData, history)
    }

    return (
        <Fragment>
            <div className="front-name">
                <Link to="/">Types</Link>
            </div>
            <form className="auth-form" autoComplete="new-password" onSubmit={ e=> handleSubmit(e) }>
                <h1>Sign up:</h1>
                
                <label className="input-label" htmlFor="name">
                    <input type="text" autoComplete="off" name="name" onChange={ e=> handleTyping(e) } />
                </label>

                <label className="input-label" htmlFor="email">
                    <input type="text" autoComplete="off" name="email" onChange={ e=> handleTyping(e) } />
                </label>

                <label className="input-label" htmlFor="password">
                    <input type="password" autoComplete="off" name="password" onChange={ e=> handleTyping(e) } />
                </label>

                <label className="input-label" htmlFor="passwordConfirmation">
                    <input type="password" autoComplete="off" name="passwordConfirmation" onChange={ e=> handleTyping(e) } />
                </label>
                <div className="auth-bottom">
                    <button type="submit" className="submit-button right-button">Ok</button>
                </div>

            </form>
        </Fragment>
    );
}
export default connect(null, { register })(withRouter(Register));