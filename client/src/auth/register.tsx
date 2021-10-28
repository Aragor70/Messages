import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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

    const handleTyping = (e: { target: HTMLInputElement }) => {
        
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        return await register(formData, history)
    }

    const customComplete = (e: any) => {
        
        console.log(e)
        if(e.target.autocomplete) {
            e.target.autocomplete ='none'
        }
    }

    return (
        <Fragment>
            <form className="auth-form" autoComplete="new-password" onSubmit={ e=> handleSubmit(e) }>
                <h1>Sign up:</h1>
                
                <label className="input-label" htmlFor="name">name
                    <input type="text" autoComplete="new-password" name="name" onChange={ e=> handleTyping(e) } onFocus={e=> customComplete(e)} />
                </label>

                <label className="input-label" htmlFor="email">e-mail
                    <input type="text" autoComplete="new-password" name="email" onChange={ e=> handleTyping(e) } onFocus={e=> customComplete(e)} />
                </label>

                <label className="input-label" htmlFor="password">password
                    <input type="password" autoComplete="new-password" name="password" onChange={ e=> handleTyping(e) } onFocus={e=> customComplete(e)} />
                </label>

                <label className="input-label" htmlFor="passwordConfirmation">confirm your password
                    <input type="password" autoComplete="new-password" name="passwordConfirmation" onChange={ e=> handleTyping(e) } onFocus={e=> customComplete(e)} />
                </label>
                <div className="auth-bottom">
                    <button type="submit" className="submit-button right-button">Continue</button>
                </div>

            </form>
        </Fragment>
    );
}
export default connect(null, { register })(withRouter(Register));