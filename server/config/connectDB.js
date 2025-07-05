import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.MONGODB_URI){
    throw new Error(
        "Please provide MONGODB_URI in the .env file"
    )
}

async function connectDB(){
    try {
        // Check if already connected
        if (mongoose.connection.readyState === 1) {
            console.log("Already connected to MongoDB")
            return
        }
        
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("MongoDB connect error", error)
        // Only exit in development, not in serverless environment
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1)
        }
        throw error
    }
}

export default connectDB