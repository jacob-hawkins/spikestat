import React, { useContext, useEffect, useState } from 'react';
import { AccountCircle, Delete, MoreVert } from '@mui/icons-material';
import './game.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { format } from 'timeago.js';
import { IconButton, Menu, MenuItem } from '@mui/material';

function Game({ post }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const [teammate, setTeammate] = useState({});
    const [opposing1, setOpposing1] = useState({});
    const [opposing2, setOpposing2] = useState({});
    const { user: currentUser } = useContext(AuthContext);
    // let teammateExist = true;
    // let opposing1Exist = true;
    // let opposing2Exist = true;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // menu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deletePost = async () => {
        try {
            await axios.delete(`/posts/${post._id}`, { data: { userId: currentUser._id } });
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
                    {/* <MenuItem onClick={handleClose}>Edit Post</MenuItem> */}
                    <MenuItem onClick={deletePost}>
                        <Delete style={{ marginRight: '5px' }} />
                        Delete Post
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
                // teammateExist = false;
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
                // opposing1Exist = false;
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
                // opposing2Exist = false;
            }
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

                <span className='gamePlayerName'>{user.username}</span>
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
                                {/* {teammateExist ? exists(teammate) : noUser(teammate)} */}
                                {noUser(teammate)}
                            </div>
                        </div>

                        <div className='vertLine'></div>

                        <div className='gameTeam'>
                            <div className='player flex-align'>
                                {/* {opposing1Exist ? exists(opposing1) : noUser(opposing1)} */}
                                {noUser(opposing1)}
                            </div>

                            <div className='player flex-align'>
                                {/* {opposing2Exist ? exists(opposing2) : noUser(opposing2)} */}
                                {noUser(opposing2)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;
