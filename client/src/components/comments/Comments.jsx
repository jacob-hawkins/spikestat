import { Button, IconButton } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { Send } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './comments.css';

export default function Comments({ post, user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const comment = useRef();

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

    function checkComments(post) {
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
    }

    useEffect(() => {
        if (post.comments.length >= 3) {
            document.getElementsByClassName('post')[0].style.maxHeight = '375px';

            if (post.comments.length > 3) {
                document.getElementsByClassName('comments')[0].style.maxHeight = '190px';
                document.getElementsByClassName('comments')[0].style.width = '100%';
                document.getElementsByClassName('comments')[0].style.overflow = 'hidden';
            }
        }
    }, []);

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

    const sendComment = async () => {
        const newComment = {
            userId: user._id,
            comment: comment.current.value,
        };

        try {
            await axios.put(`/posts/${post._id}/comment`, newComment);
            window.location.reload();
        } catch (err) {}
    };

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
