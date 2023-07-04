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

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };

        try {
            await axios.post('/posts', newPost);
            window.location.reload();
        } catch (err) {}
    };

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
                            <IconButton className='flex-align'>
                                <AddBox style={{ fontSize: 30 }} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title='Add Location'>
                            <IconButton className='flex-align'>
                                <Room style={{ fontSize: 30 }} />
                            </IconButton>
                        </Tooltip>
                    </div>

                    <div className='shareButton'>
                        <Tooltip title='Post'>
                            <IconButton type='submit' className='flex-align'>
                                <Send style={{ fontSize: 30 }} />
                            </IconButton>
                        </Tooltip>
                    </div>
                </form>
            </div>
        </div>
    );
}
