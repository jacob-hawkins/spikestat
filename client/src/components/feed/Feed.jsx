import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Post from '../post/Post';
import Share from '../share/Share';
import axios from 'axios';
import './feed.css';
import Game from '../game/Game';
import GameShare from '../gameShare/GameShare';
import PostSkeleton from '../PostSkeleton/PostSkeleton';

export default function Feed({ username }) {
    const [posts, setPosts] = useState([]);
    const [state, setState] = useState({});
    const [isLoading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const res = username
                ? await axios.get('/posts/profile/' + username)
                : await axios.get('/posts/timeline/' + user._id);
            setPosts(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
            setLoading(false);
        })();
    }, [username, user._id]);

    const handleCallback = (childData) => {
        console.log(`childdata: ${childData}`);
        setState({ game: childData });
        console.log(state);
    };

    return (
        <div className='feed'>
            <div className='feedWrapper'>
                {(!username || username === user.username) && (
                    <>
                        {state.game ? (
                            <GameShare parentCallback={handleCallback} />
                        ) : (
                            <Share parentCallback={handleCallback} />
                        )}

                        <hr className='feedHr' />
                    </>
                )}

                {isLoading
                    ? Array.from({ length: 4 }, (_, i) => i + 1).map((id) => (
                          <PostSkeleton key={id} />
                      ))
                    : posts.map((p) =>
                          p.game ? <Game key={p._id} post={p} /> : <Post key={p._id} post={p} />
                      )}
            </div>
        </div>
    );
}
