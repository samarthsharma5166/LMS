import dotenv from 'dotenv';
dotenv.config();
import connctionToDb from './config/dbConnection.js';
import app from './app.js';
import Razorpay from 'razorpay';

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

app.listen(process.env.PORT,async()=>{
  await connctionToDb();
  console.log(`server is runing at port ${process.env.PORT}`);
})