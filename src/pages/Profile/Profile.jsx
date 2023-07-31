import "./profile.css";
import Feed from "../../components/Feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import SideBar from "../../components/sidebar/sideBar";
import TopBar from "../../components/TopBar/TopBar";
import { useEffect, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

export default function Profile({
  setUserData,
  userData,
  img_url,
  setImg_url,
}) {
  const [userInfo, setUserInfo] = useState(null);
  const [coverImg_url, setCoverImg_url] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4000/user/user", {
      method: "GET",
      headers: { token: localStorage.getItem("token") },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.errorName === "AuthorizationError") {
          window.location = "/login";
        }
        setImg_url(data.imgUrl);
        setCoverImg_url(data.imgCoverUrl);
        setUserInfo(data);
      });
  }, [setImg_url]);

  async function fileUpload(formData) {
    const img = await fetch(
      "https://api.cloudinary.com/v1_1/didddubfm/image/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data.url;
      });
    return img;
  }
  const changeCover = async (e) => {
    let files = e.target.files;
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "youtube");
    const imgUrl = await fileUpload(formData);
    setCoverImg_url(imgUrl);
    fetch("https://localhost:4000/user/cover", {
      method: "POST",
      body: JSON.stringify({
        filename: imgUrl,
      }),
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
  };
  const changePhoto = async (e) => {
    let files = e.target.files;
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "youtube");
    const imgUrl = await fileUpload(formData);
    setImg_url(imgUrl);
    fetch("https://localhost:4000/user/photo", {
      method: "POST",
      body: JSON.stringify({
        filename: imgUrl,
      }),
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
  };
  return (
    <div>
      <TopBar img_url={img_url} />
      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileRighTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={coverImg_url} alt="" />
              <label className="labelCoverProfile" htmlFor="userCoverPhoto">
                <AddAPhotoIcon className="File" />
              </label>
              <input
                onChange={(e) => changeCover(e)}
                type="file"
                name="file"
                id="userCoverPhoto"
                accept="image/*"
                style={{ display: "none" }}
              />
              <img className="profileUserImg" src={img_url} alt="" />
              <label className="labelProfile" htmlFor="userPhoto">
                <AddAPhotoIcon className="File" />
              </label>
              <input
                onChange={(e) => changePhoto(e)}
                type="file"
                name="file"
                id="userPhoto"
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{userInfo?.username}</h4>
              <span className="profileInfoDesc">Hello my friend!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userData={userData} data={[userInfo]} img_url={img_url} />
            <RightBar profile />
          </div>
        </div>
      </div>
    </div>
  );
}
