import React, { useEffect } from 'react';
import './comments.css';
import { Link } from 'react-router-dom';
import { Send } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export default function Comments({ post, user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    function checkComments(post) {
        if (!(post.comments.length <= 0)) {
            return (
                <div className='commentWrapper'>
                    {post.comments.map((c) => (
                        <>{getUserData(c)}</>
                    ))}
                </div>
            );
        }
    }

    function getUserData(c) {
        return (
            <div className='comment flex-align'>
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
        );
    }

    return (
        <div className='comments'>
            <div className='commentsWrapper'>
                <div className='commentInputWrapper flex-align'>
                    <img
                        className='commentProfilePic profile-pic'
                        src={
                            user.profilePicture
                                ? PF + user.profilePicture
                                : PF + 'person/noAvatar.png'
                        }
                        alt=''
                    />
                    <input type='text' placeholder='Leave a Comment' className='commentTextbox' />

                    <IconButton>
                        <Send />
                    </IconButton>
                </div>

                {checkComments(post)}
            </div>
        </div>
    );
}
