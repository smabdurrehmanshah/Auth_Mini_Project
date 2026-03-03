import mongoose from "mongoose"

const connectedDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
    
  } catch (error) {
    console.log("Database connection failed!: ", error.message); 
    process.exit(1);
  }
}

export default connectedDB;