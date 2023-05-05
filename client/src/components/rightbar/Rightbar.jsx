import "./rightbar.css"
import { Users } from "../../dummyData"
import Online from "../online/Online"

export default function Rightbar({profile}) {
    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer flex-align">
                    <img className="birthdayImg" src="/assets/gift.png" alt="" />
                    
                    <span className="birthdayText">
                        <span className="bold">Pola Foster</span> and <span className="bold">3 other friends</span> have a birthday today.
                    </span>
                </div>

                <img className="rightbarAd" src="/assets/ad.png" alt="" />

                <h4 className="rightbarTitle">Online Friends</h4>
                
                <ul className="rightbarFriendList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u}/>
                    ))}
                </ul>
            </>
        )
    }
    
    const ProfileRightbar = () => {
        return (
            <>
                <h4 className="rightbarTitle">User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">New York</span>
                    </div>

                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">Madrid</span>
                    </div>

                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">Taken</span>
                    </div>
                </div>
                    

                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowing">
                    <div className="rightbarFollower flex-align">
                        <img className="rightbarFollowerImg" src="/assets/person/1.jpeg" alt="" />
                        <span className="rightbarFollowerName">John Carter</span>
                    </div>

                    <div className="rightbarFollower flex-align">
                        <img className="rightbarFollowerImg" src="/assets/person/1.jpeg" alt="" />
                        <span className="rightbarFollowerName">John Carter</span>
                    </div>

                    <div className="rightbarFollower flex-align">
                        <img className="rightbarFollowerImg" src="/assets/person/1.jpeg" alt="" />
                        <span className="rightbarFollowerName">John Carter</span>
                    </div>

                    <div className="rightbarFollower flex-align">
                        <img className="rightbarFollowerImg" src="/assets/person/1.jpeg" alt="" />
                        <span className="rightbarFollowerName">John Carter</span>
                    </div>

                    <div className="rightbarFollower flex-align">
                        <img className="rightbarFollowerImg" src="/assets/person/1.jpeg" alt="" />
                        <span className="rightbarFollowerName">John Carter</span>
                    </div>
                </div>
            </>
        )
        
    }
    
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                { profile ? <ProfileRightbar /> : <HomeRightbar /> }   
            </div>
        </div>
    )
}
