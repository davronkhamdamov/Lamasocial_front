import React, { useEffect, useState } from "react";
import "./sideBar.css"
import { RssFeed, Bookmark, HelpOutline, WorkOutline, Event, School, Group, PlayCircleFilledOutlined, Chat } from "@mui/icons-material"
import CloseFriend from "../closeFriend/CloseFriend";

function SideBar() {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch("http://localhost:4000/user/users", {
      method: "GET",
      headers: {
        "token": localStorage.getItem("token")
      }
    }).then(res => res.json()
      .then(data => {
        if (data.errorName === 'AuthorizationError') {
          window.location = '/login'
        }
        setData(data)
      }))
  }, [])
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">

        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>

        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />

        <ul className="sidebarFriendList">
          {
            data?.map(u => (
              <CloseFriend key={u.id} user={u} />
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default SideBar;
