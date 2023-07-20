import { Alert, AlertTitle, Collapse, IconButton } from '@mui/material';
import { AddBox, Event, Room, Send, Close } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useRef, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import './share.css';

export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const location = useRef();
    let locationOpen = false;
    const [open, setOpen] = useState(true);

    const submitHandler = async (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            desc: desc.current.value,
            location: location.current.value,
        };

        if (newPost.location === '') newPost.location = null;

        try {
            await axios.post('/posts', newPost);
            window.location.reload();
        } catch (err) {}
    };

    function showLocation() {
        let location = document.getElementById('shareLocationInput');

        if (!locationOpen) {
            location.style.visibility = 'visible';
            location.style.width = '175px';
            locationOpen = true;
        } else {
            location.style.width = '0px';
            location.style.visibility = 'hidden';
            locationOpen = false;
        }
    }

    // probably should do in feed
    function checkRecentPost() {
        // if most recent post was posted with in 5 seconds ago
        // show alert
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
                    <input placeholder={"What's on your mind?"} ref={desc} className='shareInput' />
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

                        <Tooltip title='Schedule a Game'>
                            <span>
                                <IconButton>
                                    <Event style={{ fontSize: 30 }} />
                                </IconButton>
                            </span>
                        </Tooltip>

                        <Tooltip title='Tag a Location'>
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
                                <IconButton type='submit'>
                                    <Send style={{ fontSize: 30 }} />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </div>
                </form>
            </div>

            <Collapse in={open}>
                <Alert
                    id='postAlertSuccess'
                    action={
                        <IconButton
                            aria-label='close'
                            color='inherit'
                            size='small'
                            onClick={() => {
                                setOpen(false);
                            }}>
                            <Close fontSize='inherit' />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}>
                    <AlertTitle>Success</AlertTitle>
                    Your post was successfully posted!
                </Alert>
            </Collapse>
        </div>
    );
}
