import { Room, FavoriteBorder, Favorite } from '@mui/icons-material';

export const checkLocation = (post) => {
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
};

export const checkLike = (isLiked) => {
    if (!isLiked) {
        return <FavoriteBorder />;
    } else {
        return <Favorite style={{ fill: 'rgb(246, 76, 114)' }} />;
    }
};
