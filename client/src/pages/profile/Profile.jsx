import './profile.css';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
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
                <Sidebar />

                <div className='profileRight'>
                    <div className='profileRightTop'>
                        <div className='profileCover'>
                            <img
                                className='profileCoverImg'
                                src={user.converPicture || PF + 'person/noCover.png'}
                                alt=''
                            />
                            <img
                                className='profileUserImg profile-pic'
                                src={user.profilePicture || PF + 'person/noAvatar.png'}
                                alt=''
                            />
                        </div>

                        <div className='profileInfo flex-align'>
                            <h4 className='profileInfoName'>{user.username}</h4>
                            <span className='profileInfoDesc'>{user.desc}</span>
                        </div>
                    </div>

                    <div className='profileRightBottom'>
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    );
}
