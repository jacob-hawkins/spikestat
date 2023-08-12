import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useRef } from 'react';
import { loginCall } from '../../apiCalls';
import './login.css';
import { Link } from 'react-router-dom';
import Spikeball from '../../components/spikeball/Spikeball';

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    };

    return (
        <div className='login flex-align'>
            <div className='loginWrapper'>
                <div className='loginLeft'>
                    <Spikeball />
                </div>

                <div className='loginRightWrapper'>
                    <div className='loginRight'>
                        <h1 className='loginLogo'>SpikeStat</h1>

                        <div className='loginBox'>
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
                            </form>

                            <div className='loginRegister'>
                                <span>Don't have an account?</span>
                                <Link to={'/register'} className='loginRegisterLink'>
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
