import React from "react";
import Footer from "./Component/Footer";
import Singleblog from "./Component/Singleblog";
import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import AdminHome from "./Admin/AdminHome";
import AddBlog from "./Admin/Addblog";
import AllBlogs from "./Admin/AllBlogs";
import UpdatePost from "./Admin/UpdatePost";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Singleblog />} />

        <Route path="/admin" element={<AdminHome />}>
          <Route index element={<AddBlog />} />
          <Route path="allblogs" element={<AllBlogs />} />
          <Route path="allblogs/update/:id" element={<UpdatePost />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
