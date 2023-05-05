import "./online.css"

export default function Online({user}) {
  return (
    <li className="rightbarFriend flex-align">
        <div className="rightbarProfileImgContainer">
            <img className="rightbarProfileImg profile-pic" src={user.profilePicture} alt="" />
            <span className="rightbarOnline"></span>
        </div>
        
        <span className="rightbarUsername">{user.username}</span>
    </li>
  )
}
