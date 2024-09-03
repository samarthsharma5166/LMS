import React from "react";
import {FiMenu } from "react-icons/fi";
import {AiFillCloseCircle } from "react-icons/ai";
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { logout } from "../../Redux/Slices/AuthSlice.js";
import Footer from "../Components/Footer";
const HomeLayout = ({children}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // for checking if use is logged in or not 
  const isLoggedIn = useSelector((state)=>state?.auth?.isLoggedIn);
// checking for role
  const role = useSelector((state)=>state?.auth?.role);
    const changeWidth=()=>{
        const drawerSide =document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width ='auto';
    }
    const hideDrawer=()=>{
        const element =document.getElementsByClassName("drawer-toggle");
        element[0].checked =false;
        const drawerSide =document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width =0;
    }
    const handleLogout=async(e)=>{
      e.preventDefault();
      const res = await dispatch(logout());
      if(res?.payload?.success)
      navigate('/')
    }
  return (
    <div className="h-[90vh]">
      <div className="drawer absolute left-0 z-50 w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle hidden" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu onClick={changeWidth} size={"32px"} className="font-bold text-white m-4"/>
          </label>
        </div>
        <div className="drawer-side w-0">
             <label htmlFor="my-drawer" className="drawer-overlay"></label>
             <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-100 text-base-content relative">
                <li className="w-fit absolute right-2 z-50">
                    <button onClick={hideDrawer}><AiFillCloseCircle size={24}/></button>
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {
                  isLoggedIn && role === 'ADMIN' && (
                    <li>
                      <Link to="/admin/dashboard">Admin Dashboard</Link>
                    </li>
                  )
                }
                {
                  isLoggedIn && role === 'ADMIN' && (
                    <li>
                      <Link to="/course/create">Create Course</Link>
                    </li>
                  )
                }
                <li>
                    <Link to="/courses">All courses</Link>
                </li>
                <li>
                    <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                    <Link to="/about">About Us</Link>
                </li>

                {isLoggedIn ? (
                  <li className="absolute bottom-4 w-[90%]">
                    <div className="w-full flex justify-center items-center">
                    <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full">
                      <Link to="/user/profile">Profile</Link>
                    </button>
                    <button className="btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                      <Link onClick={handleLogout}>Logout</Link>
                    </button>
                    </div>
                  </li>
                ):(
                  <li className="absolute bottom-4 w-[90%]">
                    <div className="w-full flex justify-center items-center">
                    <button className="btn-primary px-4 py-1 font-semibold rounded-md flex-1">
                      <Link to="/login">Login</Link>
                    </button>
                    <button className="btn-secondary px-4 py-1 font-semibold rounded-md flex-1">
                      <Link to="/signup">Signup</Link>
                    </button>
                    </div>
                  </li>
                )}
             </ul>
        </div>
      </div>
      {children}
      <Footer/>
    </div>
  );
};

export default HomeLayout;
