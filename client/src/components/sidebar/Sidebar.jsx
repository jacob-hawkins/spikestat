import "./sidebar.css"
import { Bookmark, Chat, Event, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline } from '@mui/icons-material';
import { Users } from "../../dummyData"
import CloseFriends from "../closeFriends/CloseFriends"

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem flex-align">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem flex-align">
                        <Chat className="sidebarIcon"/>
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem flex-align">
                        <PlayCircleFilledOutlined className="sidebarIcon"/>
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem flex-align">
                        <Group className="sidebarIcon"/>
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem flex-align">
                        <Bookmark className="sidebarIcon"/>
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem flex-align">
                        <HelpOutline className="sidebarIcon"/>
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem flex-align">
                        <WorkOutline className="sidebarIcon"/>
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem flex-align">
                        <Event className="sidebarIcon"/>
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem flex-align">
                        <School className="sidebarIcon"/>
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                </ul>
                
                <button className="sidebarButton">Show More</button>
                
                <hr className="sidebarHr" />
                
                <ul className="sidebarFriendList">
                    {Users.map((u) => (
                        <CloseFriends key={u.id} user={u}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}
