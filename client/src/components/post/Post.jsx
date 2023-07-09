import {
    AccountCircle,
    Delete,
    Favorite,
    FavoriteBorder,
    MoreVert,
    NotesOutlined,
    Room,
} from '@mui/icons-material';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import Comments from '../comments/Comments';
import { Link, redirect } from 'react-router-dom';
import { format } from 'timeago.js';
import axios from 'axios';
import './post.css';

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [comments, setComments] = useState(post.comments.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    // menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        })();
    }, [post.userId]);

    const likeHandler = () => {
        try {
            axios.put('/posts/' + post._id + '/like', { userId: currentUser._id });
        } catch (err) {}

        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

    function checkLocation() {
        if (post.location !== null) {
            return (
                <>
                    <span>
                        <Room />
                    </span>
                    <span className='postText'>{post?.location}</span>
                </>
            );
        }
    }

    function checkLike() {
        if (!isLiked) {
            return <FavoriteBorder />;
        } else {
            return <Favorite style={{ fill: 'rgb(246, 76, 114)' }} />;
        }
    }

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
                    <MenuItem onClick={goToUserPage}>
                        <AccountCircle style={{ marginRight: '5px' }} />
                        See Profile
                    </MenuItem>
                </Menu>
            );
        }
    }

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

    function goToUserPage() {
        return redirect(`/profile/${user.username}`);
    }

    return (
        <div className='post'>
            <div className='postWrapper'>
                <div className='postTop flex-align'>
                    <div className='postTopLeft flex-align'>
                        <Link
                            to={`/profile/${user.username}`}
                            className='postTopLeftLink flex-align'>
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

                    <div className='postTopRight'>
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

                <div className='postCenter'>
                    <span className='postText'>{post?.desc}</span>
                    <img className='postImg' src={PF + post?.img} alt='' />
                </div>

                <div className='postBottom flex-align'>
                    <div className='postBottomLeft flex-align'>{checkLocation()}</div>

                    <div className='postBottomRight flex-align'>
                        <Tooltip title='Like'>
                            <span>
                                <IconButton onClick={likeHandler}>{checkLike()}</IconButton>
                            </span>
                        </Tooltip>
                        <span className='postLikeCounter'>{like}</span>

                        <Tooltip title='Comments'>
                            <NotesOutlined className='postCommentIcon' />
                        </Tooltip>
                        <span className='postLikeCounter'>{comments}</span>
                    </div>
                </div>
            </div>

            <Comments key={post._id} post={post} currentUser={currentUser} />
        </div>
    );
}
