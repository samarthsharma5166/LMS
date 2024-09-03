import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../src/Helpers/axiosInstance";

const initialState = {
    courseData:[]
}

export const getAllCourses = createAsyncThunk("/course/get",async()=>{
    try {
        const res = axiosInstance.get('/course/');
        toast.promise(res,{
            loading:"Loading fetching courses!",
            success:"Courses loaded successfully",
            error:"Failed to fetch the courses"
        })
        return (await res).data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const deleteCourse = createAsyncThunk("/course/delete",async(id)=>{
    try {
        const res = axiosInstance.delete(`/course/${id}`);
        toast.promise(res,{
            loading:"deleting course!",
            success:"Course deleted successfully",
            error:"Failed to delete the courses"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const createNewCourse = createAsyncThunk("/course/create",async(data)=>{
    try {
        const formData = new FormData();
        formData.append("title",data?.title);
        formData.append("description",data?.description);
        formData.append("category",data?.category);
        formData.append("createdBy",data?.createdBy);
        formData.append("thumbnail",data?.thumbnail);
        console.log(formData)
        const res = axiosInstance.post("/course/",formData);
        toast.promise(res,{
            loading:"Creating new course!",
            success:"Course created successfully",
            error:"Failed to created course"
        })
        return (await res).data
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message);
    }
})

const courseSlice = createSlice({
    name:"courses",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCourses.fulfilled,(state,action)=>{
            if(action.payload){
                state.courseData = [...action.payload]
            }
        })
    }
})

export default courseSlice.reducer;