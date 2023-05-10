import { useState } from "react";
import "./online.css";

export default function Online({ userData }) {
    const [dataOnline, setDataOnline] = useState(null)
    setTimeout(() => {
        fetch('https://54.234.23.89:4000/user/online', {
            method: 'POST',
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                setDataOnline(data)
            })
    }, 9000);
    return (
        <>
            {
                dataOnline?.map(e => {
                    if (e.isOnline === false) {
                        return true
                    } else {
                        return (
                            <li
                                key={e.id} className="rightbarFriend">
                                <div className="rightbarProfileImgContainer">
                                    <img
                                        className="rightbarProfileImg" src={e.imgUrl} alt="" />
                                    <span className="rightbarOnline"></span>
                                </div>
                                <span
                                    className="rightbarUsername">{e.username}</span>
                            </li>
                        )
                    }
                })}
        </>
    );
}