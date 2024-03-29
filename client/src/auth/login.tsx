import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../store/actions/auth/auth';

import '../style/auth.css'
import { setAlert } from '../store/actions/alert/alert';


type LoginForm = {
    email: string | null,
    password: string | null
}

const Login = ({ login, history, setAlert }: any) => {

    const [formData, setFormData] = useState<LoginForm>({
        email: null,
        password: null
    })
    const { email } = formData;

    const handleTyping = (e: { target: HTMLInputElement }) => {
        
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email) {
            return setAlert('Please enter e-mail address.', 'danger')
        }
        

        return await login(formData, history)
    }

    return (
        <Fragment>
            
            <form className="auth-form" autoComplete="off" onSubmit={e=> handleSubmit(e)}>
                <h1>Log in:</h1>
                
                <label className="input-label" htmlFor="email">e-mail
                    <input type="text" autoComplete="off" name="email" onChange={e=> handleTyping(e)} placeholder="E-mail address" />
                </label>
                
                <label className="input-label" htmlFor="password">password
                    <input type="password" autoComplete="off" name="password" onChange={e=> handleTyping(e)} />
                </label>
                <div className="auth-bottom">
                    <button type="submit" className="submit-button right-button">Continue</button>
                </div>
                

            </form>
        </Fragment>
    );
}
export default connect(null, { login, setAlert })(withRouter(Login));