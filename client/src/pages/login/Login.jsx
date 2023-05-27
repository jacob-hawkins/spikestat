import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useRef } from 'react';
import { loginCall } from '../../apiCalls';
import './login.css';

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    };
    console.log(user);

    return (
        <div className='login flex-align'>
            <div className='loginWrapper'>
                <div className='loginLeft'>
                    <h3 className='loginLogo'>Lamasocial</h3>
                    <span className='loginDesc'>
                        Connect with friends and the world around you on Lamasocial.
                    </span>
                </div>

                <div className='loginRight'>
                    <form className='loginBox' onSubmit={handleClick}>
                        <input
                            placeholder='Email'
                            type='email'
                            required
                            className='loginInput'
                            ref={email}
                        />
                        <input
                            placeholder='Password'
                            type='password'
                            required
                            minLength={6}
                            className='loginInput'
                            ref={password}
                        />
                        <button className='loginButton' type='submit' disabled={isFetching}>
                            {isFetching ? <CircularProgress color='inherit' /> : 'Log In'}
                        </button>
                        <span className='loginForgot'>Forgot Password?</span>
                        <button className='loginRegisterButton'>
                            {isFetching ? (
                                <CircularProgress color='inherit' />
                            ) : (
                                'Create a new Account'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
