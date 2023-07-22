import axios from 'axios';
import React, { useState } from 'react'

export interface Props {
    onSetUser: any,
}

export default function LoginContainer({ onSetUser }: Props) {
    const [email, setEmail] = useState<String>("");
    const [password, setPassword] = useState<String>("");
    const [isLogin, setIsLogin] = useState<boolean>(true);

    const onLogin = async () => {
        try {
            const response = await axios.post('http://localhost:7000/user/', {
                mail: email,
                password: password
            });

            onSetUser(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const onSignup = async () => {
        try {
            const response = await axios.post('http://localhost:7000/user/signup', {
                mail: email,
                password: password
            });
            setEmail("");
            setPassword("");
            response && setIsLogin(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="auth-container">
            {
                isLogin ?
                    (
                        <div className="auth-wrap">
                            <div className="title">
                                <h4>Login</h4>
                            </div>
                            <div className="content">
                                <input
                                    type="mail"
                                    placeholder='email'
                                    value={email.toString()}
                                    onChange={(e) => setEmail(e.target.value)} />
                                <input
                                    type="password"
                                    placeholder='password'
                                    value={password.toString()}
                                    onChange={(e) => setPassword(e.target.value)} />
                                <button
                                    className='auth-btn'
                                    onClick={() => onLogin()}>Login</button>
                                <button
                                    className='link-btn'
                                    onClick={() => setIsLogin(false)}
                                >
                                    Create a new account!
                                </button>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="auth-wrap">
                            <div className="title">
                                <h4>Signup</h4>
                            </div>
                            <div className="content">
                                <input
                                    type="mail"
                                    placeholder='exp: a@gmail.com'
                                    value={email.toString()}
                                    onChange={(e) => setEmail(e.target.value)} />
                                <input
                                    type="password"
                                    placeholder='password'
                                    value={password.toString()}
                                    onChange={(e) => setPassword(e.target.value)} />
                                <input
                                    type="password"
                                    placeholder='re-enter password'
                                    onChange={(e) => {
                                        if (e.target.value !== password) {

                                        }
                                    }}
                                />
                                <button className='auth-btn' onClick={() => onSignup()}>Signup</button>
                                <button className='link-btn' onClick={() => setIsLogin(true)}>Already have account?</button>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}
