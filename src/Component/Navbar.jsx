import axios from "axios";
import React, { useState } from "react";
import logo from "../assets/logo2.png";


const Navbar = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    try {
      await axios.post(
        "https://my-blog-backend-0s7a.onrender.com/emailsubscribe",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      console.log("Error subscribing:", error);
      alert("Subscription failed. Please try again later.");
    }
  };

  return (
    <>
      <div className="h-96 bg-red-400">
        <div className="flex justify-between p-9 max-md=p-4 text-white">
          <div className="font-semibold text-3xl">Tech Hunger</div>
          <div>
            <button className="shadow-[-7px_5px] shadow-black p-2 border-2 hover:bg-slate-400 border-black rounded-sm">
              GetStarted
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-16">
          <input
            className="p-4 w-96 max-md:w-60 border-2 border-black rounded-sm"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-white p-2 border-2 hover:bg-slate-400 border-black rounded-sm"
            type="button"
            value="Subscribe"
            onClick={handleSubscribe}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
