import React from 'react';
import { MoreVert } from '@mui/icons-material';
import './game.css';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';

function Game({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className='game'>
            <div className='gameWrapper'>
                <div className='gameTopLeft flex-align'>
                    <Link to={`/profile/${user.username}`} className='gameTopLeftLink flex-align'>
                        <img
                            className='postProfileImg profile-pic'
                            src={
                                user.profilePicture
                                    ? PF + user.profilePicture
                                    : PF + 'person/noAvatar.png'
                            }
                            alt=''
                        />

                        <span className='postUsername'>jane</span>
                    </Link>

                    <span className='postDate'>Yesterday</span>
                </div>

                <div className='gameScoreWrapper flex-align'>
                    <div className='gameScore flex-align'>
                        <h1 className='score'>0</h1>
                        <h1 id='gameVs'>vs</h1>
                        <h1 className='score'>0</h1>
                    </div>
                </div>

                <div className='gamePlayerListWrapper flex-align'>
                    <div className='gamePlayerList flex-align'>
                        <div className='gameTeam'>
                            <div className='player'>
                                <Link to={`/profile/${user.username}`} className='flex-align'>
                                    <img
                                        className='postProfileImg profile-pic'
                                        src={
                                            user.profilePicture
                                                ? PF + user.profilePicture
                                                : PF + 'person/noAvatar.png'
                                        }
                                        alt=''
                                    />

                                    <span className='gamePlayerName'>jane</span>
                                </Link>
                            </div>

                            <div className='player'>
                                <p className='playerName'>John</p>
                            </div>
                        </div>

                        <div className='vertLine'></div>

                        <div className='gameTeam'>
                            <div className='player'>
                                <p className='playerName'>Alex</p>
                            </div>

                            <div className='player'>
                                <p className='playerName'>Cade</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;
