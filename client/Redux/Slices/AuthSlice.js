import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import  secureLocalStorage  from  "react-secure-storage";
import axiosInstance from '../../src/Helpers/axiosInstance.js'
const initialState = {
    isLoggedIn: secureLocalStorage.getItem('isLoggedIn') || false,
    role:secureLocalStorage.getItem('role') || '',
    data:JSON.parse(secureLocalStorage.getItem('data')) || {}
}

export const createAccount = createAsyncThunk("/auth/signup",async (data)=>{
    try {
        const res = axiosInstance.post('user/register',data);
        console.log(res)
        toast.promise(res,{
            loading:'Wait! creating your account',
            success: (data) => {
                return data?.data?.message;
            },
            error:'failed to create account'
        })
        return (await res).data
    } catch (error) {
        toast(error?.response?.data?.message);
    }
});

export const loginAccount = createAsyncThunk("/auth/login",async (data)=>{
    try {
        const res = axiosInstance.post('user/login',data);
        toast.promise(res,{
            loading:'Wait! Authentication in progress...',
            success: (data) => {
                return data?.data?.message;
            },
            error:'failed to login'
        })
        return (await res).data
    } catch (error) {
        toast(error?.response?.data?.message);
    }
});

export const logout = createAsyncThunk("/auth/logout",async ()=>{
    try {
        const res =  axiosInstance.get('user/logout');
        toast.promise(res,{
            loading:'Wait! Logout in progress...',
            success: (data) => {
                return data?.data?.message;
            },
            error:'Failed to logout'
        })
        return (await res).data
    } catch (error) {
        toast(error?.response?.data?.message);
    }
})

export const updateProfile = createAsyncThunk("/user/update/profile",async (data)=>{
    try {
        const res =  axiosInstance.put(`user/update/${data.id}`,data.formData);
        toast.promise(res,{
            loading:'Wait! profile update in progress...',
            success: (data) => {
                return data?.data?.message;
            },
            error:'Failed to update profile'
        })
        return (await res).data
    } catch (error) {
        console.log(error)
        toast(error?.response?.data?.message);
    }
})

export const getUserData = createAsyncThunk("/user/details",async (id,data)=>{
    try {
        const res =  axiosInstance.get(`user/me`,data);
        return (await res).data
    } catch (error) {
        toast(error?.message);
    }
})

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(loginAccount.fulfilled, (state, action) => {
            const { user } = action.payload;
            secureLocalStorage.setItem('data', JSON.stringify(user));
            secureLocalStorage.setItem('isLoggedIn', true);
            secureLocalStorage.setItem('role', user.role);
            state.isLoggedIn = true;
            state.data = user;
            state.role = user.role;
        })
        .addCase(logout.fulfilled,(state)=>{
            secureLocalStorage.clear();
            state.isLoggedIn = false;
            state.data = {};
            state.role = "";
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            const { user } = action.payload;
            secureLocalStorage.setItem('data', JSON.stringify(user));
            secureLocalStorage.setItem('isLoggedIn', true);
            secureLocalStorage.setItem('role', user.role);
            state.isLoggedIn = true;
            state.data = user;
            state.role = user.role;
        })
    }
})




// export const {} =authSlice.actions;
export default authSlice.reducer;