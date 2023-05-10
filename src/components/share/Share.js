import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"
import "./Share.css"
import { useRef, useState } from "react";

export default function Share({ img_url }) {
    const [title, setTitle] = useState('')
    const img = useRef(null)
    const upload_video = () => {
        let files = img.current.files;
        if (!title) {
            return alert("Title is required")
        }
        if (title.length < 4) {
            return alert('Title must be 3 character')
        }
        if (files.length === 0) {
            return alert("File is required")
        }
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "youtube");
        fetch("https://api.cloudinary.com/v1_1/didddubfm/image/upload", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                fetch("http://54.234.23.89:4000/video/upload", {
                    method: "POST",
                    body: JSON.stringify({
                        title: title.trim(),
                        filename: data.url,
                    }),
                    headers: {
                        "Content-type": "application/json",
                        token: localStorage.getItem("token"),
                    },
                }).then((res) => res.json())
                    .then((data) => {
                        alert(data.message)
                        window.location.reload()
                    })
            });
    };
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={img_url} alt="" />
                    <input placeholder="What is in your mind" className="shareInput" onInput={(e) => setTitle(e.target.value)} />
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <label htmlFor="file">
                            <div className="shareOption">
                                <PermMedia htmlColor="tomato" className="shareIcon" />
                                <span className="shareOptionText" >Photo or Videos</span>
                            </div>
                        </label>
                        <input id="file" type="file" accept="image/*" ref={img} />
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText" >Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText" >Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText" >Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" onClick={() => upload_video()}>Share</button>
                </div>
            </div>
        </div>
    )
} 