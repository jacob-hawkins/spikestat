import "./closeFriends.css"

export default function CloseFriends({user}) {
  return (
    <li className="sidebarFriend flex-align">
        <img className="sidebarFriendImg profile-pic" src={user.profilePicture} alt="" />
        <span className="sidebarFriendName">{user.username}</span>
    </li>
  )
}
