import axios from "axios";
import { useState } from "react";

const Form = ({ user, cearteHnadler }) => {
  const [errors, setErrors] = useState([]);

  const [values, setValues] = useState({
    title: "",
    message: "",
    selectedFile: "",
  });

  const clear = () => {
    setValues({
      title: "",
      message: "",
      selectedFile: "",
    });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const { title, message, selectedFile } = values;

    if (title.trim() !== "") {
      try {
        const { data } = await axios.post("http://localhost:4000/api/posts", {
          title,
          message,
          creator: user._id,
          selectedFile,
        });
      } catch (error) {
        setErrors(() => [error.message]);
      }
    } else {
      setErrors(() => ["Title is required"]);
    }

    cearteHnadler();
    clear();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors([]);

    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleCreatePost}>
        <div className="inner-form">
          <h2>Create new post</h2>
          <span className="error-text">{errors}</span>
          <div className="form-inputs">
            <label htmlFor="email">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              className="form-input"
              placeholder="Title"
              value={values.title}
              onChange={handleChange}
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
              value={values.message}
              onChange={handleChange}
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
