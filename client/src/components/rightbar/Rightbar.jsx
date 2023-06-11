import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@mui/icons-material';
import { Users } from '../../dummyData';
import { Link } from 'react-router-dom';
import Online from '../online/Online';
import axios from 'axios';
import './rightbar.css';

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const followed = currentUser.following.includes(user?._id);

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

    const followHandler = async () => {
        try {
            if (followed) {
                await axios.put('/users/' + user._id + '/unfollow', { userId: currentUser._id });
                dispatch({ type: 'UNFOLLOW', payload: user._id });
            } else {
                await axios.put('/users/' + user._id + '/follow', { userId: currentUser._id });
                dispatch({ type: 'FOLLOW', payload: user._id });
            }
        } catch (err) {
            console.log(err);
        }

        followed = !followed;
    };

    const HomeRightbar = () => {
        return (
            <>
                <div className='birthdayContainer flex-align'>
                    <img className='birthdayImg' src='/assets/gift.png' alt='' />

                    <span className='birthdayText'>
                        <span className='bold'>Pola Foster</span> and
                        <span className='bold'>3 other friends</span> have a birthday today.
                    </span>
                </div>

                <img className='rightbarAd' src='/assets/ad.png' alt='' />

                <h4 className='rightbarTitle'>Online Friends</h4>

                <ul className='rightbarFriendList'>
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        );
    };

    const ProfileRightbar = () => {
        return (
            <>
                <div className='profileCover'>
                    <img
                        className='profileCoverImg'
                        src={user.coverPicture ? PF + user.coverPicture : PF + 'person/noCover.png'}
                        alt=''
                    />
                    <img
                        className='profileUserImg profile-pic'
                        src={
                            user.profilePicture
                                ? PF + user.profilePicture
                                : PF + 'person/noAvatar.png'
                        }
                        alt=''
                    />

                    <div className='profileInfo'>
                        <h4 className='profileInfoName'>{user.username}</h4>
                        <span className='profileInfoDesc'>{user.desc}</span>
                    </div>

                    {user.username !== currentUser.username && (
                        <button onClick={followHandler} className='rightbarFollowButton flex-align'>
                            {followed ? <Remove /> : <Add />}
                            {followed ? 'UNFOLLOW' : 'FOLLOW'}
                        </button>
                    )}
                </div>

                <div className='rightbarInfo'>
                    <div className='rightbarInfoItem'>
                        <span className='rightbarInfoKey'>Games:</span>
                        <span className='rightbarInfoValue'>{user.gamesPlayed}</span>
                    </div>

                    <div className='rightbarInfoItem'>
                        <span className='rightbarInfoKey'>Wins:</span>
                        <span className='rightbarInfoValue'>{user.wins}</span>
                    </div>

                    <div className='rightbarInfoItem'>
                        <span className='rightbarInfoKey'>Loses:</span>
                        <span className='rightbarInfoValue'>{user.gamesPlayed - user.wins}</span>
                    </div>
                </div>

                <h4 className='rightbarTitle'>{user.username}'s friends</h4>
                <div className='rightbarFollowing'>
                    {friends.map((friend) => (
                        <Link
                            to={'/profile/' + friend.username}
                            style={{ textDecoration: 'none', color: 'white' }}>
                            <div className='rightbarFollower flex-align'>
                                <img
                                    className='rightbarFollowerImg'
                                    src={
                                        friend.profilePicture
                                            ? PF + friend.profilePicture
                                            : PF + 'person/noAvatar.png'
                                    }
                                    alt=''
                                />
                                <span className='rightbarFollowerName'>{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className='rightbar'>
            <div className='rightbarWrapper'>{user ? <ProfileRightbar /> : <HomeRightbar />}</div>
        </div>
    );
}
