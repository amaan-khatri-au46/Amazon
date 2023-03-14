// here we will parser our url form mongo atlas for connection 

import mongoose from "mongoose";


async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: "Amazon" })
    console.log("DB Connection Successful")
  } catch (error) {
    console.log("Error Connecting to DB")
    process.exit()
  }
}

export default connectDB;
