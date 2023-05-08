import React, { useEffect, useState } from "react";
import Feed from "../../components/Feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import SideBar from "../../components/sidebar/sideBar";
import TopBar from "../../components/TopBar/TopBar";
import "./home.css";

function Home({ setUserData, img_url, userData }) {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("http://localhost:4000/user/users", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((e) => e.json())
      .then((data) => {
        if (data?.message === "Rout not found") {
        } else if (data) {
          setData(data);
        }
        if (data.errorName === "AuthorizationError") {
          window.location = "/login";
        }
      });
  }, []);
  return (
    <div>
      <TopBar img_url={img_url} />
      <div className="homeContainer">
        <SideBar />
        <Feed userData={userData} data={data} img_url={img_url} />
        <RightBar userData={userData} />
      </div>
    </div>
  );
}

export default Home;
