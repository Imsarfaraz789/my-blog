import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const AdminHome = () => {
  return (
    <div>
      <div className="flex justify-around items-center">
        <div className="p-4 text-2xl font-semibold">Admin Panel</div>

        <nav className="flex flex-row gap-6">
          <ul>
            <li>
              <Link className="hover:text-blue-500" to="/admin">
                Add Blogs
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link className="hover:text-blue-500" to="/admin/allblogs">
                All Blogs
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminHome;
