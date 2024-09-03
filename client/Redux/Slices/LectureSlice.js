import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../src/Helpers/axiosInstance";

const initialState = {
    lectures:[]
}


export const getCourseLectures = createAsyncThunk("/course/lecture/get",async(cid)=>{
    try {
        const response =  axiosInstance.get(`/course/${cid}`);
        toast.promise(response,{
            loading:"Fetching course lectures",
            success:"Lectures loaded successfully",
            error:"Failed to fetch the courses"
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})


export const addCourseLectures = createAsyncThunk("/course/lecture/add",async(data)=>{
    try {
        const formData = new FormData();
        formData.append("lecture",data.lecture);
        formData.append("title",data.title);
        formData.append("description",data.description);
        const response =  axiosInstance.post(`course/${data.id}`,formData);
        toast.promise(response,{
            loading:"adding course lectures",
            success:"Lectures added successfully",
            error:"Failed to add the lectures"
        });
        return (await response).data;
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message);
    }
})

export const deleteCourseLectures = createAsyncThunk("/course/lecture/get",async(data)=>{
    try {
        console.log(data)
        const response =  axiosInstance.put(`/course/lectures/${data.courseId}?lectureId=${data.lectureId}`);
        toast.promise(response,{
            loading:"deleting course lectures",
            success:"Lectures deleted successfully",
            error:"Failed to delete the lectures"
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})


const lectureSlice = createSlice({
    name:"lectures",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCourseLectures.fulfilled,(state,action)=>{
            state.lectures = action.payload.data || []
        })
        .addCase(addCourseLectures.fulfilled,(state,action)=>{
            state.lectures = action.payload.data || []
        })
    },
})

export default lectureSlice.reducer;