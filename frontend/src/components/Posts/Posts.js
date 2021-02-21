import Post from "./Post/Post";
import { useState, useEffect } from "react";
import axios from "axios";

const Posts = ({ user }) => {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    const { data } = await axios.get(
      `http://localhost:4000/api/posts/${user._id}`
    );
    setPosts(data);
  }, [user]);

  return (
    <div>
      Posts
      {posts.map((post) => (
        <Post key={post._id} />
      ))}
    </div>
  );
};

export default Posts;
