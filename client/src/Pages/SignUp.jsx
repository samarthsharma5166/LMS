import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toast} from 'react-hot-toast'
import { createAccount } from "../../Redux/Slices/AuthSlice";
import { isEmail, isValidPassword } from "../Helpers/regexMatch";
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewImage, setpreviewImage] = useState();
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  // handle user data
  function handleUserInput(e){
    const {name, value} = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });

  };
  // handle image data
  function getImage(e){
    e.preventDefault();
    const uploadImage = e.target.files[0];
    if(uploadImage){
      setSignupData({
        ...signupData,
        avatar:uploadImage
      })
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener('load',function(){
        setpreviewImage(this.result);
      })
    }
  }
  async function createNewAccount(e){
    e.preventDefault();
    // checking all the fields
    if(!signupData.fullName||!signupData.email){
      toast.error("Please fill all the field!")
      return;
    }
    // checking for usename length 
    if(signupData.fullName.length < 5){
      toast.error("Name should be atleast 5 character long!");
      return;
    }
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if(!isEmail(signupData.email)){
      toast.error("Please enter a valid email!")
      return
    }
    if(!isValidPassword(signupData.password)){
      toast.error(`Password should be 8 character long and contain at least one special characters , uppercase and lowercase!`);
      return;
    }

    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    // dispatch create account action
    const response = await dispatch(createAccount(formData));
    console.log(response)
    if(response?.payload?.success)
        navigate("/");

    setSignupData({
        fullName: "",
        email: "",
        password: "",
        avatar: ""
    });
    setpreviewImage("");

  }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-screen">
        <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center p-4 gap-3 rounded-lg text-white w-96 shadow-[0_0_10px_black]">
          <h1 className="text-center text-2xl font-bold ">Registration page</h1>
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                src={previewImage}
                className="w-24 h-24 rounded-full m-auto"
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            type="file"
            className="hidden"
            id="image_uploads"
            accept=".jpg .jpeg .png .svg"
            name="image_uploads"
            onChange={getImage}
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold">
              Fullname
            </label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              placeholder="Enter your fullName..."
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={signupData.fullName}
            />
          </div>
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
              value={signupData.email}
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
              value={signupData.password}
            />
          </div>
          <button
            type="submit"
            className=" mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 ease-in-out  py-2 hover:scale-95 rounded-sm"
          >
            Create Account
          </button>
          <p className="text-center">
            Already have an account ?{" "}
            <Link
              to="/login"
              className="link text-accent cursor-pointer transition-all ease-in-out duration-300 hover:text-red-400"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default SignUp;
