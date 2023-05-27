import { useEffect, useState } from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import axios from 'axios';
import './feed.css';

export default function Feed({ username }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const res = username
                ? await axios.get('/posts/profile/' + username)
                : await axios.get('/posts/timeline/646d4992e001d71ea293d09b');
            setPosts(res.data);
        })();
    }, [username]);

    return (
        <div className='feed'>
            <div className='feedWrapper'>
                <Share />

                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    );
}
