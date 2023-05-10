import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
const Login = React.lazy(() => import("../components/login/Login"));
const Register = React.lazy(() => import("../components/register/Register"));
const Home = React.lazy(() => import("../pages/home/Home"));
const PageNotFound = React.lazy(() =>
  import("../pages/pageNotFound/PageNotFound.jsx")
);
const Profile = React.lazy(() => import("../pages/Profile/Profile"));

const Router = () => {
  const [img_url, setImg_url] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    fetch("https://54.234.23.89:4000/user/user", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setImg_url(data.imgUrl);
        setUserData(data);
      });
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            setUserData={setUserData}
            userData={userData}
            img_url={img_url}
          />
        }
      />
      ;
      <Route path="/login" element={<Login />} />;
      <Route path="/register" element={<Register />} />;
      <Route
        path="/profile"
        element={
          <Profile
            setUserData={setUserData}
            userData={userData}
            setImg_url={setImg_url}
            img_url={img_url}
          />
        }
      />
      ;
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
