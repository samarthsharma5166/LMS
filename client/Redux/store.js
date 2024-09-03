import {configureStore, createAsyncThunk} from '@reduxjs/toolkit'
import authSliceReducer from './Slices/AuthSlice';
import CourseSliceReducer from './Slices/CourseSlice';
import RazorpaySliceReducer from './Slices/RazorpaySlice';
import LectureSliceReducer from './Slices/LectureSlice';
import StatSliceReducer from './Slices/StatSlice';

const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        course:CourseSliceReducer,
        razorpay:RazorpaySliceReducer,
        lecture:LectureSliceReducer,
        stat:StatSliceReducer
    },
    devTools:true
});

export default store