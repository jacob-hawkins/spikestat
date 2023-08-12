import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';
import './register.css';
import Spikeball from '../../components/spikeball/Spikeball';

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const password2 = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();

        if (password2.current.value !== password.current.value) {
            password.current.setCustomValidity("Passwords don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                profilePicture: `person/${Math.floor(Math.random() * 10)}.png`,
            };

            try {
                await axios.post('/auth/register', user);
                navigate('/login');
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className='register flex-align'>
            <div className='registerWrapper'>
                <div className='registerLeft'>
                    <Spikeball />
                </div>

                <div className='loginRightWrapper'>
                    <div className='registerRight'>
                        <h1 className='loginLogo'>SpikeStat</h1>

                        <div className='registerBox'>
                            <form onSubmit={handleClick} className='registerBox'>
                                <input
                                    placeholder='Username'
                                    required
                                    ref={username}
                                    className='registerInput'
                                />
                                <input
                                    placeholder='Email'
                                    required
                                    ref={email}
                                    type='email'
                                    className='registerInput'
                                />
                                <input
                                    placeholder='Password'
                                    required
                                    ref={password}
                                    type='password'
                                    min={6}
                                    className='registerInput'
                                />
                                <input
                                    placeholder='Re-Enter Password'
                                    required
                                    ref={password2}
                                    type='password'
                                    min={6}
                                    className='registerInput'
                                />
                                <button type='submit' className='registerButton'>
                                    Sign Up
                                </button>
                            </form>

                            <div className='loginRegister'>
                                <span>Already have an account?</span>
                                <Link to={'/login'} className='loginRegisterLink'>
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
