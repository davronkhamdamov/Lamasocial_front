import "./Feed.css"
import Share from "../share/Share";
import Post from "../post/Post";

export default function Feed({ userData, data, img_url }) {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share img_url={img_url} />
        {
          data?.reverse()?.map((p) => (
            p?.videos.map(e => (
              <Post userData={userData} key={e?.id} post={e} user={p} />
            ))
          ))
        }
      </div>
    </div>
  );
}