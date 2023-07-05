import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { Favorite, FavoriteBorder, MoreVert, NotesOutlined, Room } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import axios from 'axios';
import './post.css';
import { IconButton, Tooltip } from '@mui/material';

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [comments, setComments] = useState(post.comments.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

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
        if (post.location !== undefined) {
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
            return <Favorite />;
        }
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
                        <MoreVert />
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
                            <span>
                                <IconButton>
                                    <NotesOutlined />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <span className='postLikeCounter'>{comments}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
