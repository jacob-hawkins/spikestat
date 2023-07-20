import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@mui/icons-material';
import { Users } from '../../dummyData';
import { Link } from 'react-router-dom';
import Online from '../online/Online';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import './rightbar.css';

ChartJS.register(ArcElement);

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    let followed = currentUser.following.includes(user?._id);

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

    const ProfileRightbar = () => {
        let gamesPlayed, wins, losses;

        if (user.gamesPlayed !== 0) {
            gamesPlayed = {
                datasets: [
                    {
                        data: [user.wins, user.gamesPlayed - user.wins],
                        backgroundColor: ['rgba(0, 211, 107, 1)', 'rgba(231, 74, 74, 1)'],
                        borderWidth: 0,
                    },
                ],
            };

            wins = {
                datasets: [
                    {
                        data: [user.gamesPlayed - user.wins, user.wins],
                        backgroundColor: ['rgba(0, 211, 107, 0.3)', 'rgba(0, 211, 107, 1)'],
                        borderWidth: 0,
                    },
                ],
            };

            losses = {
                datasets: [
                    {
                        data: [
                            user.gamesPlayed - (user.gamesPlayed - user.wins),
                            user.gamesPlayed - user.wins,
                        ],
                        backgroundColor: ['rgba(231, 74, 74, 0.3)', 'rgba(231, 74, 74, 1)'],
                        borderWidth: 0,
                    },
                ],
            };
        } else {
            gamesPlayed = {
                datasets: [
                    {
                        data: [1],
                        backgroundColor: ['rgba(80, 80, 80, 0.3)'],
                        borderWidth: 0,
                    },
                ],
            };

            wins = {
                datasets: [
                    {
                        data: [1],
                        backgroundColor: ['rgba(0, 211, 107, 0.3)'],
                        borderWidth: 0,
                    },
                ],
            };

            losses = {
                datasets: [
                    {
                        data: [1],
                        backgroundColor: ['rgba(231, 74, 74, 0.3)'],
                        borderWidth: 0,
                    },
                ],
            };
        }

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
                        <div className='sideChart'>
                            <Doughnut data={wins} plugins={Tooltip} />
                        </div>
                    </div>

                    <div className='rightbarInfoItem'>
                        <div className='doughnutChart'>
                            <Doughnut data={gamesPlayed} plugins={Tooltip} />
                        </div>
                    </div>

                    <div className='rightbarInfoItem'>
                        <div className='sideChart'>
                            <Doughnut data={losses} plugins={Tooltip} />
                        </div>
                    </div>
                </div>

                <div className='rightbarInfo'>
                    <div className='rightbarInfoItem'>
                        <span className='rightbarInfoKey'>Wins:</span>
                        <span className='rightbarInfoValue'>{user.wins}</span>
                    </div>

                    <div className='rightbarInfoItem'>
                        <span className='rightbarInfoKey'>Games:</span>
                        <span className='rightbarInfoValue'>{user.gamesPlayed}</span>
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
            <div className='rightbarWrapper'>
                <ProfileRightbar />
            </div>
        </div>
    );
}
