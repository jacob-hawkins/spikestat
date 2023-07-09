import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Delete, MoreHoriz, Send } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './comments.css';

export default function Comments({ post, currentUser }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const comment = useRef();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (post.comments.length >= 3) {
            document.getElementsByClassName('post')[0].style.maxHeight = '450px';
            document.getElementsByClassName('comments')[0].style.maxHeight = '250px';

            if (post.comments.length > 3) {
                document.getElementsByClassName('comments')[0].style.maxHeight = '190px';
                document.getElementsByClassName('comments')[0].style.width = '100%';
                document.getElementsByClassName('comments')[0].style.overflow = 'hidden';
            }
        }
    }, []);

    function expandComments() {
        document.getElementsByClassName('post')[0].style.maxHeight = '425px';
        document.getElementsByClassName('comments')[0].style.maxHeight = '225px';
        document.getElementsByClassName('comments')[0].style.width = '99%';
        document.getElementsByClassName('comments')[0].style.overflow = 'auto';

        document.getElementsByClassName('commentSeeMoreButton')[0].style.width = '0px';
        document.getElementsByClassName('commentSeeMoreButton')[0].style.height = '0px';
        document.getElementsByClassName('commentSeeMoreButton')[0].style.visibility = 'hidden';
    }

    function closeComments() {
        document.getElementsByClassName('post')[0].style.maxHeight = '375px';
        document.getElementsByClassName('comments')[0].style.maxHeight = '190px';
        document.getElementsByClassName('comments')[0].style.width = '100%';
        document.getElementsByClassName('comments')[0].style.overflow = 'hidden';

        document.getElementsByClassName('commentSeeMoreButton')[0].style.width = '100%';
        document.getElementsByClassName('commentSeeMoreButton')[0].style.height = '50px';
        document.getElementsByClassName('commentSeeMoreButton')[0].style.visibility = 'visible';

        document
            .getElementsByClassName('comments')[0]
            .scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    const checkComments = (post) => {
        if (!(post.comments.length <= 0)) {
            if (post.comments.length > 3) {
                return (
                    <>
                        <div className='commentWrapper'>
                            {post.comments.map((c) => (
                                <>{getUserData(c)}</>
                            ))}
                        </div>
                        <span className='commentCloseButtonWrapper'>
                            <Button style={{ color: 'rgb(246, 76, 114)' }} onClick={closeComments}>
                                Close
                            </Button>
                        </span>

                        <button className='commentSeeMoreButton' onClick={expandComments}>
                            See More
                        </button>
                    </>
                );
            } else {
                return (
                    <div className='commentWrapper'>
                        {post.comments.map((c) => (
                            <>{getUserData(c)}</>
                        ))}
                    </div>
                );
            }
        }
    };

    function getUserData(c) {
        const user = c.user;

        return (
            <div className='comment flex-align'>
                <div className='flex-align'>
                    <Link
                        to={`/profile/${user.username}`}
                        className='commentUsernameWrapper flex-align'>
                        <img
                            className='postProfileImg profile-pic'
                            src={
                                user.profilePicture
                                    ? PF + user.profilePicture
                                    : PF + 'person/noAvatar.png'
                            }
                            alt=''
                        />

                        <span>{user.username}</span>
                    </Link>

                    <span>{c.comment}</span>
                </div>

                {checkIfUser(c)}
            </div>
        );
    }

    // menu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const checkIfUser = (c) => {
        if (c.user._id === currentUser._id) {
            return (
                <>
                    <IconButton
                        id='postEditButton'
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        <MoreHoriz />
                    </IconButton>
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
                        <MenuItem onClick={deleteComment}>
                            <Delete style={{ marginRight: '5px' }} />
                            Delete comment
                        </MenuItem>
                    </Menu>
                </>
            );
        }
    };

    const sendComment = async () => {
        const newComment = {
            user: currentUser,
            comment: comment.current.value,
        };

        try {
            await axios.put(`/posts/${post._id}/comment`, newComment);
            window.location.reload();
        } catch (err) {}
    };

    const deleteComment = async () => {
        // try {
        //     await axios.delete(`/posts/${post._id}/comment`, {
        //         data: { userId: currentUser._id },
        //     });
        //     window.location.reload();
        // } catch (err) {}
    };

    return (
        <div className='comments'>
            <div className='commentsWrapper'>
                <div className='commentInputWrapper flex-align'>
                    <img
                        className='commentProfilePic profile-pic'
                        src={
                            currentUser.profilePicture
                                ? PF + currentUser.profilePicture
                                : PF + 'person/noAvatar.png'
                        }
                        alt=''
                    />
                    <input
                        type='text'
                        placeholder='Leave a Comment'
                        ref={comment}
                        className='commentTextbox'
                    />

                    <IconButton onClick={sendComment}>
                        <Send />
                    </IconButton>
                </div>

                {checkComments(post)}
            </div>
        </div>
    );
}
