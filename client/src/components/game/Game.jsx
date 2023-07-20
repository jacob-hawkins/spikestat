import { AccountCircle, Delete, MoreVert } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { checkLocation, checkLike } from '../../postHandlers';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import axios from 'axios';
import './game.css';

function Game({ post }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const [teammate, setTeammate] = useState({});
    const [opposing1, setOpposing1] = useState({});
    const [opposing2, setOpposing2] = useState({});
    const { user: currentUser } = useContext(AuthContext);
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // menu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteGame = async () => {
        try {
            await axios.delete(`/game/${post._id}`, { data: { userId: currentUser._id } });
            window.location.reload();
        } catch (err) {}
    };

    function checkMenuOptions() {
        if (post.userId === currentUser._id) {
            return (
                <Menu
                    id='postMenu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    sx={{
                        mt: '1px',
                        '& .MuiMenu-paper': {
                            backgroundColor: 'rgb(28, 15, 73)',
                            color: 'white',
                        },
                    }}>
                    <MenuItem onClick={deleteGame}>
                        <Delete style={{ marginRight: '5px' }} />
                        Delete Game
                    </MenuItem>
                </Menu>
            );
        } else {
            return (
                <Menu
                    id='postMenu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    sx={{
                        mt: '1px',
                        '& .MuiMenu-paper': {
                            backgroundColor: 'rgb(28, 15, 73)',
                            color: 'white',
                        },
                    }}>
                    <Link to={`/profile/${user.username}`} style={{ textDecoration: 'none' }}>
                        <MenuItem>
                            <AccountCircle style={{ marginRight: '5px' }} />
                            See Profile
                        </MenuItem>
                    </Link>
                </Menu>
            );
        }
    }

    // likes
    const likeHandler = () => {
        try {
            axios.put('/game/' + post._id + '/like', { userId: currentUser._id });
        } catch (err) {}

        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

    // get users
    useEffect(() => {
        (async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        })();

        (async () => {
            try {
                let res = await axios.get(`/users/exist?username=${post.teammate}`);

                if (res.data === true) {
                    try {
                        res = await axios.get(`/users?username=${post.teammate}`);
                        setTeammate(res.data);
                    } catch (err) {}
                } else {
                    setTeammate({ username: null });
                }
            } catch (err) {}
        })();

        (async () => {
            try {
                let res = await axios.get(`/users/exist?username=${post.opposingTeam[0]}`);

                if (res.data === true) {
                    try {
                        res = await axios.get(`/users?username=${post.opposingTeam[0]}`);
                        setOpposing1(res.data);
                    } catch (err) {}
                } else {
                    setOpposing1({ username: null });
                }
            } catch (err) {}
        })();

        (async () => {
            try {
                let res = await axios.get(`/users/exist?username=${post.opposingTeam[1]}`);

                if (res.data === true) {
                    res = await axios.get(`/users?username=${post.opposingTeam[1]}`);
                    setOpposing2(res.data);
                } else {
                    setOpposing2({ username: null });
                }
            } catch (err) {}
        })();
    }, [post.userId, post.teammate, post.opposingTeam[0], post.opposingTeam[1]]);

    const exists = (user) => {
        return (
            <Link to={`/profile/${user.username}`} className='flex-align'>
                <img
                    className='gameProfileImg profile-pic'
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
                    className='gameProfileImg profile-pic'
                    src={PF + 'person/noAvatar.png'}
                    alt=''
                />

                <span className='gamePlayerName'>{user}</span>
            </>
        );
    };

    return (
        <div className='game'>
            <div className='gameWrapper'>
                <div className='gameTop flex-align'>
                    <div className='gameTopLeft flex-align'>
                        <Link
                            to={`/profile/${user.username}`}
                            className='gameTopLeftLink flex-align'>
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

                    <div className='gameTopRight'>
                        <IconButton
                            id='postEditButton'
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup='true'
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                            <MoreVert />
                        </IconButton>
                        {checkMenuOptions()}
                    </div>
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
                            <div className='player flex-align'>{exists(user)}</div>

                            <div className='player flex-align'>
                                {teammate &&
                                    (teammate.username !== null
                                        ? exists(teammate)
                                        : noUser(post.teammate))}
                            </div>
                        </div>

                        <div className='vertLine'></div>

                        <div className='gameTeam'>
                            <div className='player flex-align'>
                                {opposing1 && opposing1.username !== null
                                    ? exists(opposing1)
                                    : noUser(post.opposingTeam[0])}
                            </div>

                            <div className='player flex-align'>
                                {opposing2 && opposing2.username !== null
                                    ? exists(opposing2)
                                    : noUser(post.opposingTeam[1])}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='gameBottom flex-align'>
                    <div className='gameBottomLeft flex-align'>{checkLocation(post)}</div>

                    <div className='gameBottomRight flex-align'>
                        <Tooltip title='Like'>
                            <span>
                                <IconButton onClick={likeHandler}>{checkLike(isLiked)}</IconButton>
                            </span>
                        </Tooltip>
                        <span className='gameLikeCounter'>{like}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;
