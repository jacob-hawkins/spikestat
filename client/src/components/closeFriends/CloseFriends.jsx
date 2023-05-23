import "./closeFriends.css"

export default function CloseFriends({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  return (
    <li className="sidebarFriend flex-align">
        <img className="sidebarFriendImg profile-pic" src={PF+user.profilePicture} alt="" />
        <span className="sidebarFriendName">{user.username}</span>
    </li>
  )
}
