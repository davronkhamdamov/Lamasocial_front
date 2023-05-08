import React, { useEffect, useState } from "react";
import "./topBar.css"
import { Search, Person, Chat } from "@mui/icons-material"
import { Link } from "react-router-dom";
import time from "../../utils/time";

const DropDawn = ({ data, messageData }) => {
  return (
    <div className="dropDawn" >
      <div className="navbar">
        <p>{data}</p>
      </div>
      <div className="wrap">
        {messageData?.length ? messageData.map(e => {
          return (
            <div className="list" key={e.id}>
              <img className="user" src={e.imgUrl} alt="i"></img>
              <div>
                <p className="message">{e.title}</p>
                <p className="date">{time(e).replace('Hozirgina qoyilgan post', 'Hozirgina sizga like bosdi').replace('daqiqa avval qoyilgan post', 'daqiqa avval like bosdi')}</p>
              </div>
              <img src={e.video_img} alt="l" className="post_img"></img>
            </div>
          )
        }) :
          <p style={{
            textAlign: "center"
          }}>Hech qanday xabar yoq</p>
        }
      </div>
    </div >
  )
}
export default function Topbar({ img_url }) {
  const [person, setPerson] = useState(false)
  const [chat, setChat] = useState(false)
  const [messageData, setMessageData] = useState(null)
  useEffect(() => {
    fetch('http://localhost:4000/message/list', {
      method: "GET",
      headers: {
        token: localStorage.getItem('token')
      }
    }).then(res => res.json())
      .then(async data => setMessageData(await data))
  }, [])
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
              <span className="topbarIconBadge">{messageData?.length}</span>
            </div>
            {person && <DropDawn data={'Subscrible'} />}
            {chat && <DropDawn data={'message'} messageData={messageData} />}
          </div>
          <Link to='/profile'>
            <img src={img_url} alt="" className="topbarImg" />
          </Link>
        </div>
      </div>
    </>
  );
}
