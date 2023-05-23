import "./profile.css"
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImg" src={`${PF}posts/1.jpeg`} alt="" />
                            <img className="profileUserImg profile-pic" src={`${PF}person/1.jpeg`} alt="" />
                        </div>
                        
                        <div className="profileInfo flex-align">
                            <h4 className="profileInfoName">Jacob Hawkins</h4>
                            <span className="profileInfoDesc">Description</span>
                        </div>
                    </div>

                    <div className="profileRightBottom">
                        <Feed />
                        <Rightbar profile />
                    </div>
                </div>
            </div>
        </>
    )
}
