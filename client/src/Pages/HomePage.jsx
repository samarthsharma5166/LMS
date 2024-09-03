import React from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { Link } from 'react-router-dom'
import Hero from '../assets/images/homePageMainImage.png'
const HomePage = () => {
  return (
    <HomeLayout>
        <div className='pt10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]'>
            <div className='w-1/2 space-y-6'>
                <h1 className='text-5xl font-semibold'>
                    Find out best
                    <span className='text-yellow-500 font-bold'>
                        Online Courses
                    </span>
                </h1>
                <p className='textxl text-gray-200'>
                    we have large library of courses taught by skilled and qualified faculties at a very affordable cost.
                </p>
                <div className='space-x-6'>
                    <Link to='/courses'>
                        <button className='bg-yellow-500 px-5 py-3 rounded-md hover:bg-yellow-600 cursor-pointer transition-all ease-in-out duration-300'>
                        Explore courses
                        </button>
                    </Link>
                    <Link to='/courses'>
                        <button className='border border-yellow-500 px-5 py-3 rounded-md hover:bg-yellow-600 cursor-pointer transition-all ease-in-out duration-300'>
                        Explore courses
                        </button>
                    </Link>
                </div>
            </div>
            <div className='1/2 flex justify-center items-center '>
                <img src={Hero} alt="homepageimage"  />
            </div>
        </div>
    </HomeLayout>
  )
}

export default HomePage
