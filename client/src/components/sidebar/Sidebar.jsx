import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import './sidebar.css';
import { format } from 'timeago.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Cake } from '@mui/icons-material';

export default function Sidebar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);

    console.log(user);

    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    let birthday = new Date(user.createdAt).toLocaleDateString('en-US', options);

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get('/users/friends/' + user._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
    }, [user]);

    return (
        <div className='sidebar'>
            <div className='sidebarWrapper'>
                <img src={PF + user.profilePicture} alt='' className='sidebarProfilePicture' />
                <h1 className='sidebarTitle'>Welcome {user.username}!</h1>
                <hr />
                <ul className='sidebarList'>
                    <li>
                        <Cake style={{ marginRight: '5px' }} />
                        Created {birthday} &#8226; {format(user.createdAt)}
                    </li>
                    <li>Followers: {user.followers.length}</li>
                    <li>Following: {user.following.length}</li>
                </ul>
                <hr />
                <h1 className='sidebarTitle'>{user.username}'s friends</h1>
                {friends.map((friend) => (
                    <Link
                        to={'/profile/' + friend.username}
                        style={{ textDecoration: 'none', color: 'white' }}>
                        <div className='sidebarFollower flex-align'>
                            <img
                                className='sidebarFollowerImg profile-pic'
                                src={
                                    friend.profilePicture
                                        ? PF + friend.profilePicture
                                        : PF + 'person/noAvatar.png'
                                }
                                alt=''
                            />
                            <span className='sidebarFollowerName'>{friend.username}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
