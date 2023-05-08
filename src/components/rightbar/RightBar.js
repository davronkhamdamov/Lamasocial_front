import React from "react";
import "./rightBar.css";
import Online from "../online/Online";

function RightBar({ profile, userData }) {
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.jpeg" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/post/1.jpeg" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          <Online userData={userData} />
        </ul>
      </>
    )
  }


  const ProfileRightbar = () => {
    return (
      <div>
        <h4 className="rightbarTitle" >User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey" >City: </span>
            <span className="rightbarInfoValue" >New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey" >From: </span>
            <span className="rightbarInfoValue" >Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey" >Relationship: </span>
            <span className="rightbarInfoValue" >Single</span>
          </div>
        </div>

        <h4 className="rightbarTitle" >User friends</h4>

        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img src="assets/person/1.jpeg" className="rightbarFollowingImg" alt="img" />
            <span className="rightbarFollowingName" >John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/person/2.jpeg" className="rightbarFollowingImg" alt="img" />
            <span className="rightbarFollowingName" >John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/person/3.jpeg" className="rightbarFollowingImg" alt="img" />
            <span className="rightbarFollowingName" >John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/person/2.jpeg" className="rightbarFollowingImg" alt="img" />
            <span className="rightbarFollowingName" >John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/person/3.jpeg" className="rightbarFollowingImg" alt="img" />
            <span className="rightbarFollowingName" >John Carter</span>
          </div>
        </div>
      </div>
    )
  }



  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

export default RightBar;
