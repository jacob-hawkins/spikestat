import './profile.css';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Topbar from '../../components/topbar/Topbar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

export default function Profile() {
    const [user, setUser] = useState({});
    const username = useParams().username;

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        })();
    }, [username]);

    return (
        <>
            <Topbar />
            <div className='profile'>
                <div className='profileLeft'>
                    <Feed username={username} />
                </div>

                <div className='profileRight'>
                    <Rightbar user={user} />
                </div>
            </div>
        </>
    );
}
