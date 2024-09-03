import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAccount } from "../../Redux/Slices/AuthSlice.js";
import { toast } from 'react-hot-toast';
import { isEmail, isValidPassword } from "../Helpers/regexMatch.js";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // handle user data
  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData, // Corrected typo here
      [name]: value,
    });
  }


  // handle login
  async function handleloginAccount(e) {
    e.preventDefault();
    // checking all the fields
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the field!");
      return;
    }
    if(!isEmail(loginData.email)){
      toast.error("Please enter a valid email!")
      return
    }
    if(!isValidPassword(loginData.password)){
      toast.error(`Password should be 8 character long and contain at least one special characters , uppercase and lowercase!`);
      return;
    }
    // dispatch login account action
    const response = await dispatch(loginAccount(loginData));
    console.log(response);
    if (response?.payload?.success) navigate("/");

    setLoginData({
      email: "",
      password: "",
    });
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleloginAccount} className="flex flex-col justify-center p-4 gap-3 rounded-lg text-white w-96 shadow-[0_0_10px_black]">
          <h1 className="text-center text-2xl font-bold ">Login page</h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="text"
              required
              name="email"
              id="email"
              placeholder="Enter your email..."
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={loginData.email}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="text"
              required
              name="password"
              id="password"
              placeholder="Enter your password..."
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={loginData.password}
            />
          </div>

          <button
            type="submit"
            className=" mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 ease-in-out  py-2 hover:scale-95 rounded-sm hob"
          >
            Login Account
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default SignIn;
