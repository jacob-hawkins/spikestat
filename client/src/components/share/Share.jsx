import { EmojiEmotions, Label, PermMedia, Room } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useRef, useState } from 'react';
import './share.css';

export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const [file, setFile] = useState(null);

    return (
        <div className='share'>
            <div className='shareWrapper'>
                <div className='shareTop flex-align'>
                    <img
                        className='shareProfileImg profile-pic'
                        src={
                            user.profilePicture
                                ? PF + user.profilePicture
                                : PF + 'person/noAvatar.png'
                        }
                        alt=''
                    />
                    <input
                        placeholder={"What's on your mind " + user.username + '?'}
                        ref={desc}
                        className='shareInput'
                    />
                </div>

                <hr className='shareHr' />

                <form className='shareBottom flex-align'>
                    <div className='shareOptions'>
                        <label htmlFor='file' className='shareOption flex-align'>
                            <PermMedia htmlColor='tomato' className='shareIcon' />
                            <span className='shareOptionText'>Photo or Video</span>
                            <input
                                type='file'
                                id='file'
                                accept='.png, .jpeg, .jpg'
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ display: 'none' }}
                            />
                        </label>

                        <div className='shareOption flex-align'>
                            <Label htmlColor='blue' className='shareIcon' />
                            <span className='shareOptionText'>Tag</span>
                        </div>

                        <div className='shareOption flex-align'>
                            <Room htmlColor='green' className='shareIcon' />
                            <span className='shareOptionText'>Location</span>
                        </div>

                        <div className='shareOption flex-align'>
                            <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
                            <span className='shareOptionText'>Feelings</span>
                        </div>
                    </div>

                    <button className='shareButton'>Share</button>
                </form>
            </div>
        </div>
    );
}
