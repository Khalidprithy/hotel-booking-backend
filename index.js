import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './api/routes/auth.js'
import usersRoute from './api/routes/users.js'
import hotelsRoute from './api/routes/hotels.js'
import roomsRoute from './api/routes/rooms.js'
import cookieParser from "cookie-parser";
import cors from 'cors'


const app = express();
dotenv.config();


const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.j2m70h0.mongodb.net/booking?retryWrites=true&w=majority`);
        console.log("Connected to MongoDB")
    } catch (error) {
        handleError(error);
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected")
})
mongoose.connection.on("connected", () => {
    console.log("MongoDB connected")
})

app.get('/', (req, res) => {
    res.send('Hello, Hotel booking server')
})
app.get('/hi', (req, res) => {
    res.send('hi, Hotel booking server')
})


// middle wares
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/auth', authRoute)
app.use('/users', usersRoute)
app.use('/hotels', hotelsRoute)
app.use('/rooms', roomsRoute)


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "There is as error"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})



app.listen(5000, () => {
    connect()
    console.log("Server running")
})