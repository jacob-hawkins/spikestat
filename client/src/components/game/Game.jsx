import React, { useContext, useEffect, useState } from 'react';
// import { MoreVert } from '@mui/icons-material';
import './game.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { format } from 'timeago.js';

function Game({ post }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const [teammate, setTeammate] = useState({});
    const [opposing1, setOpposing1] = useState({});
    const [opposing2, setOpposing2] = useState({});
    const { user: currentUser } = useContext(AuthContext);
    let teammateExist = true;
    let opposing1Exist = true;
    let opposing2Exist = true;

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        })();

        (async () => {
            try {
                const res = await axios.get(`/users?userId=${post.teammate}`);
                setTeammate(res.data);
            } catch (err) {
                setTeammate({
                    username: post.teammate,
                });
                teammateExist = false;
            }
        })();

        (async () => {
            try {
                const res = await axios.get(`/users?userId=${post.opposingTeam[0]}`);
                setOpposing1(res.data);
            } catch (err) {
                setOpposing1({
                    username: post.opposingTeam[0],
                });
                opposing1Exist = false;
            }
        })();

        (async () => {
            try {
                const res = await axios.get(`/users?userId=${post.opposingTeam[1]}`);
                setOpposing2(res.data);
            } catch (err) {
                setOpposing2({
                    username: post.opposingTeam[1],
                });
                opposing2Exist = false;
            }
        })();
    }, [post.userId, post.teammate, post.opposingTeam[0], post.opposingTeam[1]]);

    const exsists = (user) => {
        return (
            <Link to={`/profile/${user.username}`} className='flex-align'>
                <img
                    className='postProfileImg profile-pic'
                    src={
                        user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'
                    }
                    alt=''
                />

                <span className='gamePlayerName'>{user.username}</span>
            </Link>
        );
    };

    const noUser = (user) => {
        return (
            <>
                <img
                    className='postProfileImg profile-pic'
                    src={PF + 'person/noAvatar.png'}
                    alt=''
                />

                <span className='gamePlayerName'>{user.username}</span>
            </>
        );
    };

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

                        <span className='postUsername'>{user.username}</span>
                    </Link>
                    <span className='postDate'>{format(post.createdAt)}</span>
                </div>

                <div className='gameScoreWrapper flex-align'>
                    <div className='gameScore flex-align'>
                        <h1 className='score'>{post.score}</h1>
                        <h1 id='gameVs'>vs</h1>
                        <h1 className='score'>{post.opposingScore}</h1>
                    </div>
                </div>

                <div className='gamePlayerListWrapper flex-align'>
                    <div className='gamePlayerList flex-align'>
                        <div className='gameTeam'>
                            <div className='player'>{exsists(user)}</div>

                            <div className='player'>
                                {teammateExist ? exsists(teammate) : noUser(teammate)}
                            </div>
                        </div>

                        <div className='vertLine'></div>

                        <div className='gameTeam'>
                            <div className='player'>
                                {console.log(opposing1Exist)}
                                {opposing1Exist ? exsists(opposing1) : noUser(opposing1)}
                            </div>

                            <div className='player'>
                                {opposing2Exist ? exsists(opposing2) : noUser(opposing2)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;
