import app from '../index.js'
import connectDB from '../config/connectDB.js'

// Connect to database on cold start
await connectDB()

export default app 