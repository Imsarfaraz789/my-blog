import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

const UpdatePost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/admin/blog/${id}`
        );
        const postData = response.data;
        setTitle(postData.title);
        setSummary(postData.summary);
        setCategory(postData.category);
        setDescription(postData.description);
      } catch (error) {
        console.error("Error fetching blog post data:", error);
      }
    };

    fetchPostData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      title,
      summary,
      category,
      description,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/admin/blog/${id}`,
        updatedPost
      );
      alert("Blog post updated successfully");

      setTitle("");
      setCategory("");
      setDescription("");
      setSummary("");
    } catch (error) {
      console.error("Error updating blog post:", error);
      alert("Error updating blog post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
      <div>
        <label className="block">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border"
        />
      </div>
      <div>
        <label className="block">Summary</label>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full p-2 border"
        />
      </div>
      <div>
        <label className="block">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border"
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

      <div className="mt-56">
        <button type="submit" className="w-full p-2  bg-blue-500 text-white">
          Submit
        </button>
      </div>
    </form>
  );
};

export default UpdatePost;
