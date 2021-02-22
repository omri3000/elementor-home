import "./styles.css";
import { useState } from "react";
import moment from "moment";

const Post = ({ content }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="post">
      <h2>{content.title}</h2>
      {content.message.length < 250 ? (
        <p>{content.message}</p>
      ) : readMore ? (
        <p>
          {content.message}{" "}
          <span onClick={() => setReadMore(false)} className="read-more-btn">
            read less
          </span>
        </p>
      ) : (
        <p>
          {content.message.substring(0, 250)}...{" "}
          <span onClick={() => setReadMore(true)} className="read-more-btn">
            read more
          </span>
        </p>
      )}
      <div className="created">
        <span>{moment(content.createdAt).fromNow()}</span>
      </div>
    </div>
  );
};

export default Post;
