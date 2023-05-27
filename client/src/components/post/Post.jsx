import { MoreVert } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import axios from 'axios';
import './post.css';

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        })();
    }, [post.userId]);

    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

    return (
        <div className='post'>
            <div className='postWrapper'>
                <div className='postTop flex-align'>
                    <div className='postTopLeft flex-align'>
                        <Link to={`/profile/${user.username}`}>
                            <img
                                className='postProfileImg profile-pic'
                                src={user.profilePicture || PF + 'person/noAvatar.png'}
                                alt=''
                            />
                        </Link>

                        <span className='postUsername'>{user.username}</span>

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
                    <div className='postBottomLeft flex-align'>
                        <img
                            className='likeIcon'
                            src={`${PF}like.png`}
                            onClick={likeHandler}
                            alt=''
                        />
                        <img
                            className='likeIcon'
                            src={`${PF}heart.png`}
                            onClick={likeHandler}
                            alt=''
                        />
                        <span className='postLikeCounter'>{like} likes</span>
                    </div>

                    <div className='postBottomRight'>
                        <span className='postCommentText'>{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
