import { AddBox, Room, Send } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import './share.css';

export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const location = useRef();
    let open = false;
    let disabled = true;

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
            location: location.current.value,
        };

        try {
            await axios.post('/posts', newPost);
            window.location.reload();
        } catch (err) {}
    };

    function showLocation() {
        let location = document.getElementById('shareLocationInput');

        if (!open) {
            location.style.visibility = 'visible';
            location.style.width = '175px';
            open = true;
        } else {
            location.style.width = '0px';
            location.style.visibility = 'hidden';
            open = false;
        }
    }

    return (
        <div className='share'>
            <div className='shareWrapper'>
                <div className='shareTop flex-align'>
                    <img
                        className='shareProfileImg profile-pic'
                        src={
                            user.profilePicture
                                ? PF + user.profilePicture
                                : PF + 'person/noAvatar.png'
                        }
                        alt=''
                    />
                    <input
                        placeholder={"What's on your mind " + user.username + '?'}
                        ref={desc}
                        className='shareInput'
                    />
                </div>

                <hr className='shareHr' />

                <form className='shareBottom flex-align' onSubmit={submitHandler}>
                    <div className='shareOptions'>
                        <Tooltip title='Create a Game'>
                            <span>
                                <IconButton>
                                    <AddBox style={{ fontSize: 30 }} />
                                </IconButton>
                            </span>
                        </Tooltip>

                        <Tooltip title='Share a Location'>
                            <span>
                                <IconButton onClick={showLocation}>
                                    <Room style={{ fontSize: 30 }} />
                                </IconButton>
                            </span>
                        </Tooltip>

                        <input
                            type='text'
                            id='shareLocationInput'
                            placeholder='Location'
                            ref={location}
                        />
                    </div>

                    <div className='shareButtonWrapper'>
                        <Tooltip title='Post'>
                            <span>
                                <IconButton type='submit' disabled={disabled}>
                                    <Send style={{ fontSize: 30 }} />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </div>
                </form>
            </div>
        </div>
    );
}
