import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import adminRouter from './src/routes/adminRoutes.js';
import userRouter from './src/routes/userRoutes.js';
import connectDb from './db/index.js';
import path from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(cors())
connectDb()

app.use("/public", express.static(path.join(__dirname, "public")))
app.use('/uploads', express.static('public/uploads'));


app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)

app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({ success: false, message: err?.message || 'something went wrong' })
})

app.get('/', (req, res) => {
    res.json({ message: `API is running ${process.env.PORT}` });
})

app.listen(process.env.PORT, () => {
    console.log(`server is running at this port ${process.env.PORT} `)
})