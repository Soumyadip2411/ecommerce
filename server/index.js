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

// CORS configuration with proper origins
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://ecommerce-2dqi.vercel.app',
    'https://ecommerce-2dqi.vercel.app/',
    process.env.FRONTEND_URL
].filter(Boolean) // Remove undefined values

console.log('Allowed CORS origins:', allowedOrigins)

app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
            console.log('Request with no origin - allowing')
            return callback(null, true)
        }
        
        // Check if origin is in allowed list
        if (allowedOrigins.includes(origin)) {
            console.log('Origin allowed:', origin)
            return callback(null, true)
        }
        
        console.log('Origin blocked:', origin)
        console.log('Allowed origins:', allowedOrigins)
        return callback(new Error('Not allowed by CORS'))
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposedHeaders: ['Set-Cookie']
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy: false
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
        database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
        corsOrigins: allowedOrigins
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
    console.error('Error:', err.message)
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({ 
            error: 'CORS error', 
            message: 'Origin not allowed',
            allowedOrigins: allowedOrigins
        })
    }
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

