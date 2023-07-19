import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';
import './register.css';

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
                    <h3 className='registerLogo'>Lamasocial</h3>
                    <span className='registerDesc'>
                        Connect with friends and the world around you on Lamasocial.
                    </span>
                </div>

                <div className='registerRight'>
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
                        <button className='registerRegisterButton'>Log into Account</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
