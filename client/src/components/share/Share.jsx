import "./share.css"
import { EmojiEmotions, Label, PermMedia, Room } from '@mui/icons-material';

export default function Share() {
  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop flex-align">
                <img className="shareProfileImg profile-pic" src="./assets/person/1.jpeg" alt="" />
                <input placeholder="What's on your mind?" className="shareInput" />
            </div>
            
            <hr className="shareHr" />

            <div className="shareBottom flex-align">
                <div className="shareOptions">
                    <div className="shareOption flex-align">
                        <PermMedia htmlColor="tomato" className="shareIcon" />
                        <span className="shareOptionText" >Photo or Video</span>
                    </div>

                    <div className="shareOption flex-align">
                        <Label htmlColor="blue" className="shareIcon" />
                        <span className="shareOptionText">Tag</span>
                    </div>

                    <div className="shareOption flex-align">
                        <Room htmlColor="green" className="shareIcon" />
                        <span className="shareOptionText">Location</span>
                    </div>

                    <div className="shareOption flex-align">
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>

                <button className="shareButton">Share</button>
            </div>
        </div>
    </div>
  )
}
