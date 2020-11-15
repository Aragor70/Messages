import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { login } from '../store/actions/auth/auth';
import Alert from '../utils/alert';

import '../style/auth.css'

type LoginForm = {
    email: string | null,
    password: string | null
}

const Login = ({ login, history }: any) => {

    const [formData, setFormData] = useState<LoginForm>({
        email: null,
        password: null
    })
    const { email, password } = formData;

    const handleTyping = (e: { target: HTMLInputElement }) => {
        
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await login(formData, history)
    }

    return (
        <Fragment>
            <div className="front-name">
                <Link to="/">Types</Link>
            </div>
            <Alert />
            <form className="auth-form" autoComplete="off" onSubmit={e=> handleSubmit(e)}>
                <h1>Log in:</h1>
                
                <label className="input-label" htmlFor="email">
                    <input type="text" autoComplete="off" name="email" onChange={e=> handleTyping(e)} placeholder="E-mail address" />
                </label>
                
                <label className="input-label" htmlFor="password">
                    <input type="password" autoComplete="off" name="password" onChange={e=> handleTyping(e)} />
                </label>
                <div className="auth-bottom">
                    <button type="submit" className="submit-button right-button">Ok</button>
                </div>
                

            </form>
        </Fragment>
    );
}
export default connect(null, { login })(withRouter(Login));