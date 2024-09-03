import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { isEmail } from "../Helpers/regexMatch";
import axiosInstance from "../Helpers/axiosInstance";

const Contact = () => {

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message:""
      });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setUserInput({
          ...userInput, // Corrected typo here
          [name]: value,
        });
      }
    const onFormSubmit=async(e)=>{
        e.preventDefault();
        if(!userInput.email ||!userInput.name ||!userInput.message ){
            toast.error("All fields are mandatory!");
            return;
        }
        if(!isEmail(userInput.email)){
          toast.error("Please Enter a valid email!");
          return;
        }
        try {
          const response = axiosInstance.post('/contact',userInput);
        toast.promise(response,{
          loading:"Submitting your message!",
          success:"form submitted successfully",
          error:"failed to submit the form"
        })
        const contactResponse = await response;
        if(contactResponse?.data?.success){
            setUserInput({
            name: "",
            email: "",
            message:""
          })
        }
        } catch (error) {
         toast.error("Operation Failed!"); 
        }

    }
  return (
    <HomeLayout>
      <div className="flex justify-center items-center h-[100vh]">
        <form noValidate onSubmit={onFormSubmit} className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]">
          <h1 className="text-center text-2xl font-bold ">Contact form</h1>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">Name</label>
            <input
              type="text"
              required
              name="name"
              id="name"
              placeholder="Enter your name..."
              className="bg-transparent px-2 py-1 border"
              value={userInput.name}
              onChange={handleUserInput}
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" className="text-xl font-semibold">Email</label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email..."
              className="bg-transparent px-2 py-1 border"
              value={userInput.email}
              onChange={handleUserInput}
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="message" className="text-xl font-semibold">Message</label>
            <textarea
              type="text"
              required
              name="message"
              id="message"
              placeholder="Enter your message..."
              className="bg-transparent px-2 py-1 border resize-none h-40"
              value={userInput.message}
              onChange={handleUserInput}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 ease-in-out  py-2 hover:scale-95 rounded-sm"
          >
            Login Account
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Contact;
