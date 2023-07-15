import React from 'react';
import { MoreVert } from '@mui/icons-material';
import './game.css';

function Game() {
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

                <div className='gameScore'></div>
                <div className='gamePlayerList'></div>
            </div>
        </div>
    );
}

export default Game;
