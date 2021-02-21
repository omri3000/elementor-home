import axios from "axios";
import { useState } from "react";

const Form = ({ user, cearteHnadler }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const clear = () => {
    setTitle("");
    setMessage("");
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("http://localhost:4000/api/posts", {
      title,
      message,
      creator: user._id,
    });

    cearteHnadler();
    clear();
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleCreatePost}>
        <div className="inner-form">
          <h2>Create new post</h2>
          <div className="form-inputs">
            <label htmlFor="email">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              className="form-input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="password">Message</label>
            <textarea
              id="message"
              type="text"
              name="message"
              className="form-input"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button className="form-input-btn" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
