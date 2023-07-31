import React from "react";
import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import "./post.css";
import time from "../../utils/time";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

export default function Post({ userData, post, user }) {
  const [like, setLike] = useState(post?.likes.filter((e) => e.isLike)?.length);
  const [likeIcon, setLikeIcon] = useState(false);
  const [isLiked, setIsLiked] = useState(
    post.likes[0] &&
      post?.likes?.some((e) => {
        if (userData?.id === e.userId && e.isLike) {
          return true;
        }
        return false;
      })
  );
  const likeHandler = (id) => {
    if (!isLiked) setLikeIcon(true);
    setTimeout(() => {
      setLikeIcon(false);
    }, 1400);
    fetch("https://lcoalhost:4000/likes/like", {
      method: "POST",
      body: JSON.stringify({
        video_id: id,
      }),
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const likeCount = data?.likes?.filter((e) => e?.isLike);
        if (!likeCount[0]) {
          setLike(0);
          setIsLiked(false);
        } else {
          setIsLiked(!isLiked);
          setLike(likeCount.length);
        }
      });
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src={user.imgUrl} alt="" />
            <span className="postUsername">{post.username}</span>
            <span className="postDate">{time(post)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.title}</span>
          <img
            onDoubleClick={() => likeHandler(post.id)}
            className="postImg"
            src={post.videoUrl}
            alt=""
          />
          {likeIcon && (
            <img
              className="imgLIke"
              style={{ display: "block" }}
              src="assets/like/like.gif"
              alt="img"
            />
          )}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {isLiked ? (
              <ThumbUpIcon
                className="likeIcon"
                onClick={() => likeHandler(post.id)}
              />
            ) : (
              <ThumbUpOffAltIcon
                className="likeIcon"
                onClick={() => likeHandler(post.id)}
              />
            )}
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">19 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
