import mongoose from "mongoose";
// const connectDb= async (handler)=>{
const connectDb = async (handler) => {
  // i think mongoose.connections contains the array of the connections and here we are checking the state of thr first connection
  if (mongoose.connections[0].readyState) {
    // if we are already connected to a connection then this block runs
    return;
  }
  // if no connection is there then we sart the connection
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connected succesfully")
  } catch (err) {
    console.log(err);
  }
};

export default connectDb;
