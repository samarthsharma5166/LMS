import React, { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux' 
import { getAllCourses } from '../../../Redux/Slices/CourseSlice';
import HomeLayout from '../../Layouts/HomeLayout'
import CourseCard from './CourseCard';
const CourseList = () => {
    const dispatch = useDispatch();
    const {courseData} = useSelector((state)=>state.course);
    async function loadCourses(){
        await dispatch(getAllCourses());
    }
    useEffect(()=>{
        loadCourses();
    },[])
  return (
    <HomeLayout>
        <div className='min-h-[90vh] pl-20 pt-12 flex flex-col gap-10 text-white'>
            <h1 className='text-center text-3xl font-semibold mb-5'>
                Explore the courses made by &nbsp;
                <span className='font-bold text-yellow-500'>
                     Industry experts
                </span>
            </h1>
            <div className='mb-10 flex flex-wrap gap-14'>
                {courseData?.map((ele)=>{
                    return <CourseCard key={ele._id} data={ele}/>
                })}
            </div>
            
        </div>
    </HomeLayout>
  )
}

export default CourseList
 