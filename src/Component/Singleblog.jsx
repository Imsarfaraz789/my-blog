import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  FacebookShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from "react-share";
import { Helmet } from "react-helmet";
import LazyLoad from "react-lazyload";

const Singleblog = () => {
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/singlepost/${id}`
        );
        setSinglePost(response.data);
        console.log("Data retrieved");
      } catch (error) {
        console.log("Error retrieving data:", error);
      }
    };
    fetchData();
  }, [id]);

  const renderHTML = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const body = doc.body;
    const elements = body.children;

    const components = Array.from(elements).map((element, index) => {
      const tagName = element.tagName.toLowerCase();
      let component;

      switch (tagName) {
        case "h1":
          component = (
            <h1 key={index} className="text-3xl font-bold">
              {element.textContent}
            </h1>
          );
          break;
        case "h2":
          component = (
            <h2 key={index} className="text-2xl font-bold">
              {element.textContent}
            </h2>
          );
          break;

        case "h3":
          component = (
            <h3 key={index} className="text-xl font-bold">
              {element.textContent}
            </h3>
          );
          break;

        case "p":
          component = (
            <p key={index} className="text-lg font-bold">
              {element.textContent}
            </p>
          );

        default:
          component = (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: element.outerHTML }}
            />
          );
      }

      return component;
    });

    return components;
  };

  return (
    <>
      <Helmet>
        <title>{`${singlePost.category} | ${singlePost.title}`}</title>
        <meta
          name={singlePost.summary}
          content={singlePost.description}
        />
      </Helmet>
      <div className="w-[60vw] m-auto max-md:w-full p-10">
        <div className="flex flex-col items-center pt-6">
          <LazyLoad height={80} offset={100}>
            <img
              src={singlePost.profileImage}
              alt="Profile"
              className="w-20 h-20 object-top rounded-full"
            />
          </LazyLoad>
          <span className="text-xl leading-8 capitalize font-medium">
            {singlePost.profileName}
          </span>
        </div>

        <div>
          <h1 className="capitalize pt-16 text-3xl leading-6 font-medium">
            {singlePost.title}
          </h1>
        </div>

        <div className="pt-10 leading-10 text-[#928888c8]">
          <span>{new Date(singlePost.createdAt).toDateString()}</span>
          <LazyLoad height={200} offset={100}>
            <img
              className="shadow-md shadow-black"
              src={singlePost.blogImage}
              alt="blog image"
            />
          </LazyLoad>
        </div>
        <div className="">
          <summary className="bg-[#dbd1d1e4] mt-10 rounded-sm text-black p-2 list-none">
            {singlePost.summary}
          </summary>

          {/* Render HTML content safely with custom styling */}
          <div className="leading-10">
            {singlePost.description && renderHTML(singlePost.description)}
          </div>

          <span className="pt-10 leading-10 text-[#928888c8]">
            Last Update: {new Date(singlePost.updatedAt).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-center pt-20 gap-2">
          <FacebookShareButton
            url={window.location.href}
            quote={singlePost.title}
          >
            <FaFacebook className="text-blue-700 size-10 pr-2" />
          </FacebookShareButton>
          <LinkedinShareButton
            url={window.location.href}
            title={singlePost.title}
            summary={singlePost.summary}
          >
            <FaLinkedin className="text-blue-700 size-10 pr-2" />
          </LinkedinShareButton>
          <EmailShareButton
            url={window.location.href}
            subject={singlePost.title}
            body={singlePost.description}
          >
            <FaInstagram className="text-red-700 size-10 pr-2" />
          </EmailShareButton>
        </div>
      </div>
    </>
  );
};

export default Singleblog;
