import { useEffect, useState } from "react";
import "./online.css";
import io from "socket.io-client";

let socket
const ENDPOINT = "http://localhost:4000"

export default function Online({ userData }) {
    const [dataOnline, setDataOnline] = useState(null)
    useEffect(() => {

    }, [])
    return <button onClick={() => {
        socket = io(ENDPOINT, {
            withCredentials: true,
            extraHeaders: {
                "my-custom-header": "abcd"
            }
        })
        socket.on('count', (msg) => {
            console.log(msg);
        })
    }}>count</button>

    return dataOnline?.map(e => {
        if (e?.isOnline === false) {
            return <button>count</button>
        } else {
            return <li key={e.id} className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                    <img
                        className="rightbarProfileImg" src={e.imgUrl} alt="" />
                    <span className="rightbarOnline"></span>
                </div>
                <span
                    className="rightbarUsername">{e.username}</span>
            </li>
        }
    })
}