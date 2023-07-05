import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Alert, AlertTitle, Collapse, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import Post from '../post/Post';
import Share from '../share/Share';
import axios from 'axios';
import './feed.css';

export default function Feed({ username }) {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        (async () => {
            const res = username
                ? await axios.get('/posts/profile/' + username)
                : await axios.get('/posts/timeline/' + user._id);
            setPosts(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        })();
    }, [username, user._id]);

    return (
        <div className='feed'>
            <div className='feedWrapper'>
                {(!username || username === user.username) && <Share />}

                <Collapse in={open}>
                    <Alert
                        id='postAlert'
                        action={
                            <IconButton
                                aria-label='close'
                                color='inherit'
                                size='small'
                                onClick={() => {
                                    setOpen(false);
                                }}>
                                <Close fontSize='inherit' />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}>
                        <AlertTitle>Success</AlertTitle>
                        Your post was successfully posted!
                    </Alert>
                </Collapse>

                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    );
}
