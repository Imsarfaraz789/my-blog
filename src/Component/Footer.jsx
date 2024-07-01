import React from "react";
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import LazyLoad from "react-lazyload";
import logo from "../assets/logo2.png";

const Footer = () => {
  return (
    <>
      <div className="flex justify-around h-32 items-center max-md:items-end max-md:pb-2 bg-black mt-10 text-white">
        <div className=" size-32">
          <LazyLoad>
            <img className="text-white" src={logo} alt="logo" />
          </LazyLoad>
        </div>
        <div className="text-lg max-md:text-sm">
          &copy; {new Date().getFullYear()} Tech Hunter. All rights reserved.
        </div>
        <div className="flex">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram className="text-red-700 size-10 pr-2 max-md:size-6" />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook className="text-blue-700 size-10 pr-2 max-md:size-6" />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-blue-700 size-10 pr-2 max-md:size-6" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
