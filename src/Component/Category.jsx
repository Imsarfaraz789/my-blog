import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LazyLoad from "react-lazyload";
import { Helmet } from "react-helmet";

const Category = () => {
  const [menu, setMenu] = useState("All");
  const [blogPosts, setpost] = useState([]);

  useEffect(() => {
    const allpost = async () => {
      try {
        const response = await axios.get(
          `https://my-app-backend-qvrd.onrender.com/allblog`
        );
        console.log(response.data);
        setpost(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    allpost();
  }, []);
  return (
    <>
      <Helmet>
        <title>Tech Hunger | Home | {menu}</title>
      </Helmet>
      <div className="">
        <div className="flex justify-center my-10 gap-6 items-center flex-row cursor-pointer">
          <div
            onClick={() => setMenu("All")}
            className={
              menu === "All" ? " bg-black py-1 px-4 rounded-sm text-white" : ""
            }
          >
            All
          </div>
          <div
            onClick={() => setMenu("Technology")}
            className={menu === "Technology" ? " bg-black p-1 text-white" : ""}
          >
            Technology
          </div>
          <div
            onClick={() => setMenu("Finance")}
            className={
              menu === "Finance" ? " bg-black py-1 px-4 text-white" : ""
            }
          >
            Finance
          </div>
          <div
            onClick={() => setMenu("StartUp")}
            className={
              menu === "StartUp" ? " bg-black py-1 px-4 text-white" : ""
            }
          >
            StartUp
          </div>
        </div>
        <div className="flex justify-center flex-wrap">
          <div className="flex gap-4 w-80  flex-wrap justify-center ">
            {blogPosts
              .filter((item) =>
                menu === "All" ? true : item.category === menu
              )
              .map((post) => (
                <div key={post._id} className="border-2 border-[#2f2e2e] p-2 ">
                  <LazyLoad>
                    <img
                      className="w-80 h-56 object-contain"
                      src={post.blogImage}
                      alt="this is image"
                    />
                  </LazyLoad>
                  <div className="py-1 px-4 bg-black text-white inline-block mt-2 mb-2">
                    {post.category}
                  </div>
                  <h2 className="text-wrap leading-7 font-medium text-lg">
                    {post.title}
                  </h2>
                  <Link
                    to={`/blog/${post._id}`}
                    className="text-blue-700 underline"
                  >
                    View more
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
