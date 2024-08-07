import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const [allpost, setAllpost] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://my-blog-backend-0s7a.onrender.com/allblog"
        );
        setAllpost(response.data);
        console.log("data fetech");
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const deletePost = async (id) => {
    try {
      await axios.delete(`https://my-blog-backend-0s7a.onrender.com/blog/${id}`);
      setAllpost(allpost.filter((post) => post._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="text-center pb-4">All BLOG LIST</h1>
      <div className=" h-full border-2">
        {allpost.map((item) => {
          return (
            <div
              className=" flex justify-between p-2 border-2 shadow-md m-4"
              key={item._id}
            >
              <div>
                <h1 className="leading-10 font-medium text-3xl">
                  {item.title}
                </h1>
                <div className="mt-2">
                  <p className="bg-black inline text-white p-1">
                    {item.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4">
                <Link to={`/admin/allblogs/update/${item._id}`}>
                  <FaEdit className="size-6 m-2" />
                </Link>
                <MdDelete
                  className="size-6 m-2 cursor-pointer"
                  onClick={() => deletePost(item._id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllBlogs;
