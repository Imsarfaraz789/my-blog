import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link", "image"],
    [{ align: [] }],
    [{ "code-block": { showcode: true } }], // Custom option for code-block
  ],
};

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profileName, setProfileName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("blogImage", blogImage);
    formData.append("profileImage", profileImage);
    formData.append("profileName", profileName);

    try {
      const response = await axios.post(
        "https://my-app-backend-qvrd.onrender.com/blogpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Blog post created successfully");
      setTitle("");
      setSummary("");
      setCategory("");
      setDescription("");
      setBlogImage(null);
      setProfileImage(null);
      setProfileName("");
    } catch (err) {
      alert("Error creating blog post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
      <div>
        <label className="block">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border"
          placeholder="Enter Title..."
        />
      </div>
      <div>
        <label className="block">Summary:</label>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full p-2 border"
          placeholder="Enter Summary..."
        />
      </div>
      <div>
        <label className="block">Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border"
          placeholder="Enter Category..."
        />
      </div>
      <div>
        <label className="block">Description:</label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          modules={modules}
          className="w-full  border"
          placeholder="Enter Description..."
        />
      </div>
      <div>
        <label className="block mt-12">Blog Image:</label>{" "}
        <input
          type="file"
          onChange={(e) => setBlogImage(e.target.files[0])}
          className="w-full p-2"
        />
      </div>
      <div>
        <label className="block">Profile Image:</label>
        <input
          type="file"
          onChange={(e) => setProfileImage(e.target.files[0])}
          className="w-full p-2"
        />
      </div>
      <div>
        <label className="block">Profile Name:</label>
        <input
          type="text"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          className="w-full p-2 border"
          placeholder="Enter Profile Name..."
        />
      </div>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white">
        Submit
      </button>
    </form>
  );
};

export default AddBlog;
