import React, { useContext, useRef, useState } from 'react';
import './gameShare.css';
import { Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Close, Delete, MoreVert, Room, Send } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function GameShare(props) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const score = useRef();
    const opposingScore = useRef();
    const teammate = useRef();
    const opposing1 = useRef();
    const opposing2 = useRef();
    const location = useRef();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const submitHandler = async (e) => {
        e.preventDefault();

        const newGame = {
            userId: user._id,
            score: score.current.value,
            opposingScore: opposingScore.current.value,
            teammate: teammate.current.value,
            opposingTeam: [opposing1.current.value, opposing2.current.value],
            location: location.current.value,
        };

        if (newGame.location === '') newGame.location = null;

        try {
            await axios.post('/game', newGame);
            window.location.reload();
        } catch (err) {}
    };

    const setGame = () => {
        props.parentCallback(false);
    };

    return (
        <div className='game'>
            <div className='gameWrapper'>
                <div className='gameTop flex-align'>
                    <div className='gameTopLeft flex-align'>
                        <div className='gameTopLeftLink flex-align'>
                            <img
                                className='postProfileImg profile-pic'
                                src={
                                    user.profilePicture
                                        ? PF + user.profilePicture
                                        : PF + 'person/noAvatar.png'
                                }
                                alt=''
                            />

                            <span className='postUsername'>{user.username}</span>
                        </div>
                    </div>

                    <div className='gameTopRight'>
                        <Tooltip title='Create a Post'>
                            <span>
                                <IconButton onClick={setGame}>
                                    <Close style={{ fontSize: 30 }} />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </div>
                </div>

                <div className='gameScoreWrapper flex-align'>
                    <div className='gameScore gameShareScore flex-align'>
                        <input
                            type='text'
                            maxLength='2'
                            placeholder={'0'}
                            ref={score}
                            className='shareScore'
                        />
                        <h1 id='gameVs'>vs</h1>
                        <input
                            type='text'
                            placeholder={'0'}
                            maxLength='2'
                            ref={opposingScore}
                            className='shareScore'
                        />
                    </div>
                </div>

                <div className='gamePlayerListWrapper flex-align'>
                    <div className='gamePlayerList flex-align'>
                        <div className='gameTeam gameShareTeam'>
                            <div className='player flex-align'>
                                <img
                                    className='gameProfileImg profile-pic'
                                    src={
                                        user.profilePicture
                                            ? PF + user.profilePicture
                                            : PF + 'person/noAvatar.png'
                                    }
                                    alt=''
                                />
                                <div className='gamePlayerName'>{user.username} (You)</div>
                            </div>

                            <div className='player flex-align'>
                                <input
                                    type='text'
                                    placeholder={'Teammate'}
                                    ref={teammate}
                                    className='gameShareInput'
                                />
                            </div>
                        </div>

                        <div className='vertLine'></div>

                        <div className='gameTeam gameShareTeam'>
                            <div className='player flex-align'>
                                <input
                                    type='text'
                                    placeholder={'Opposing Player 1'}
                                    ref={opposing1}
                                    className='gameShareInput'
                                />
                            </div>

                            <div className='player flex-align'>
                                <input
                                    type='text'
                                    placeholder={'Opposing Player 2'}
                                    ref={opposing2}
                                    className='gameShareInput'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={submitHandler} className='gameShareBottom flex-align'>
                    <div className='gameBottomLeft flex-align'>
                        <Room style={{ marginRight: '10px' }} />
                        <input
                            type='text'
                            placeholder={'Location (optional)'}
                            ref={location}
                            className='gameShareInput'
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
        </div>
    );
}

export default GameShare;
