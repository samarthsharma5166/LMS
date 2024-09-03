import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../src/Helpers/axiosInstance";

const initialState = {
    allUserCount: 0,
    subscribedCount: 0
};

export const getStateData = createAsyncThunk("stats/get",async()=>{
    try {
        const res = axiosInstance.get('/admin/stats/users');
        toast.promise(res,{
            loading:"Loading fetching stats!",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to fetch the stats"
        })
        return (await res).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const statSlice = createSlice({
    name:'state',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getStateData.fulfilled,(state,action)=>{
            state.allUserCount = action?.payload?.allUserCount;
            state.subscribedCount = action?.payload?.subscribedUserCount;
        })
    }
})

export default statSlice.reducer;