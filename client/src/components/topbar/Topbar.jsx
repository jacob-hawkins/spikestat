import './topbar.css';
import { Search, Person, Chat, Notifications, Add, Close } from '@mui/icons-material';
import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Alert, AlertTitle, Collapse, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';

export default function Topbar() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const search = useRef();

    const searchForUser = () => {
        console.log('called');

        (async () => {
            try {
                let res = await axios.get(`/users/exist?username=${search.current.value}`);

                if (res.data === true) {
                    navigate(`/profile/${search.current.value}`);
                } else {
                    let alert = document.getElementById('searchAlertWarning');
                    alert.style.visibility = 'visible';
                    alert.style.height = '75px';
                }
            } catch (err) {}
        })();
    };

    return (
        <>
            <div className='topbarContainer'>
                <div className='topbarLeft'>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <span className='logo'>Spikestat</span>
                    </Link>
                </div>

                <div className='topbarCenter'>
                    <div className='searchbarWrapper flex-align'>
                        <div className='searchbar flex-align'>
                            <Add className='addIcon' />
                            <input
                                placeholder='Search for friends!'
                                ref={search}
                                className='searchInput'
                            />
                            <Tooltip title='Search'>
                                <span>
                                    <IconButton onClick={searchForUser}>
                                        <Search className='searchIcon' />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                </div>

                <div className='topbarRight'>
                    <Link to={`/profile/${user.username}`}>
                        <img
                            src={
                                user.profilePicture
                                    ? PF + user.profilePicture
                                    : PF + 'person/noAvatar.png'
                            }
                            alt=''
                            className='topbarImg profile-pic'
                        />
                    </Link>
                </div>
            </div>
            <Collapse in={open}>
                <Alert
                    id='searchAlertWarning'
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
                    <AlertTitle>Error</AlertTitle>
                    No such user was found. Please make sure to match the username exactly.
                </Alert>
            </Collapse>
        </>
    );
}
