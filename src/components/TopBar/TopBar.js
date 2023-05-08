import React, { useState } from "react";
import "./topBar.css"
import { Search, Person, Chat } from "@mui/icons-material"
import { Link } from "react-router-dom";

const DropDawn = ({ data }) => {
  return (
    <div className="dropDawn" >
      <div className="navbar">
        <p>{data}</p>
      </div>
      <div className="wrap">
        <div className="list">
          <img className="user" src="/assets/person/1.jpeg" alt="i"></img>
          <div>
            <p className="message">text</p>
            <p className="date">Sun May 07 2023 19:21:23</p>
          </div>
          <img src="/assets/post/2.jpg" alt="l" className="post_img"></img>
        </div>
        <div className="list">
          <img className="user" src="/assets/person/1.jpeg" alt="i"></img>
          <div>
            <p className="message">text</p>
            <p className="date">Sun May 07 2023 19:21:23</p>
          </div>
          <img src="/assets/post/2.jpg" alt="l" className="post_img"></img>
        </div>
        <div className="list">
          <img className="user" src="/assets/person/1.jpeg" alt="i"></img>
          <div>
            <p className="message">text</p>
            <p className="date">Sun May 07 2023 19:21:23</p>
          </div>
          <img src="/assets/post/2.jpg" alt="l" className="post_img"></img>
        </div>
      </div>
    </div >)
}
export default function Topbar({ img_url }) {
  const [person, setPerson] = useState(false)
  const [chat, setChat] = useState(false)
  return (
    <>
      {person || chat ?
        <div className="overflow" onClick={() => {
          setPerson(false)
          setChat(false)
        }}></div> : null
      }
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to='/'>
            <span className="logo">Lamasocial</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              placeholder="Search for friend, post or video"
              className="searchInput"
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem" onClick={() => {
              setPerson(!person)
              setChat(false)
            }}>
              <Person />
              <span className="topbarIconBadge">7</span>
            </div>
            <div className="topbarIconItem" onClick={() => {
              setChat(!chat)
              setPerson(false)
            }}>
              <Chat />
              <span className="topbarIconBadge">2</span>
            </div>
            {person && <DropDawn data={'Subscrible'} />}
            {chat && <DropDawn data={'message'} />}
          </div>
          <Link to='/profile'>
            <img src={img_url} alt="" className="topbarImg" />
          </Link>
        </div>
      </div>
    </>
  );
}
