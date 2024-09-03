import mongoose from "mongoose";
mongoose.set('strictQuery',false);
const connctionToDb=async()=>{
  mongoose.connect(
    await process.env.MONGO_URI || `mongodb+srv://samarth_sharma5166:VsG59TYyotILFLZa@cluster0.rois9ak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  ).then((conn)=>console.log(`connected to mongodb database ${conn.connection.host}`))
  .catch((error)=>{console.log(error); process.exit(1);})
}

export default connctionToDb;