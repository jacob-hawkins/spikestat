import "./post.css"
import { MoreVert } from '@mui/icons-material';
import { Users } from "../../dummyData"
import { useState } from "react";

export default function Post({post}) {  
    const [like, setLike] = useState(post.like);
    const [isLiked, setIsLiked] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const likeHandler = () => {
        setLike(isLiked ? like-1 : like+1);
        setIsLiked(!isLiked);
    }
    
    return (
        <div className="post">
            <div className="postWrapper">
            <div className="postTop flex-align">
                <div className="postTopLeft flex-align">
                
                <img className="postProfileImg profile-pic"
                    src={Users.filter((u) => u.id === post.userId)[0].profilePicture}
                    alt=""
                />
                
                <span className="postUsername">
                    {Users.filter((u) => u.id === post.userId)[0].username}
                </span>
                
                <span className="postDate">{post.date}</span>
                </div>

                <div className="postTopRight">
                <MoreVert />
                </div>
            </div>

            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img className="postImg" src={PF+post.photo} alt="" />
            </div>

            <div className="postBottom flex-align">
                <div className="postBottomLeft flex-align">
                <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
                <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
                <span className="postLikeCounter">{like} likes</span>
                </div>

                <div className="postBottomRight">
                <span className="postCommentText">{post.comment} comments</span>
                </div>
            </div>
            </div>
        </div>
    )
}
