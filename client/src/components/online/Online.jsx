import "./online.css"

export default function Online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  return (
    <li className="rightbarFriend flex-align">
        <div className="rightbarProfileImgContainer">
            <img className="rightbarProfileImg profile-pic" src={PF+user.profilePicture} alt="" />
            <span className="rightbarOnline"></span>
        </div>
        
        <span className="rightbarUsername">{user.username}</span>
    </li>
  )
}
