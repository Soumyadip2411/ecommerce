import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import uploadRouter from './route/upload.router.js'
import subCategoryRouter from './route/subCategory.route.js'
import productRouter from './route/product.route.js'
import cartRouter from './route/cart.route.js'
import addressRouter from './route/address.route.js'
import orderRouter from './route/order.route.js'
import mongoose from 'mongoose'

const app = express()

// CORS configuration with fallback
const allowedOrigins = process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : ['http://localhost:5173', 'https://your-frontend-domain.vercel.app']
app.use(cors({
    credentials : true,
    origin : function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}))

const PORT = process.env.PORT || 8080

app.get("/",(request,response)=>{
    ///server to client
    response.json({
        message : "Server is running " + PORT
    })
})

app.get("/health", (request, response) => {
    response.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
        database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
    })
})

app.use('/api/user',userRouter)
app.use("/api/category",categoryRouter)
app.use("/api/file",uploadRouter)
app.use("/api/subcategory",subCategoryRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
app.use('/api/order',orderRouter)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Something went wrong!' })
})

// For serverless deployment, export the app
export default app

// Only start the server if this file is run directly (not in serverless environment)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    connectDB().then(()=>{
        app.listen(PORT,()=>{
            console.log("Server is running",PORT)
        })
    }).catch((error) => {
        console.error("Failed to connect to database:", error)
        // Don't exit in serverless environment
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1)
        }
    })
}

