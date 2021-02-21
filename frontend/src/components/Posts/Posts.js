import Post from "./Post/Post";
import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const Posts = ({ user, update }) => {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    const { data } = await axios.get(
      `http://localhost:4000/api/posts/${user._id}`
    );
    setPosts(data);
  }, [user, update]);

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post content={post} key={post._id} />
      ))}
    </div>
  );
};

export default Posts;
