import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = express()
app.use(express.json())
app.use(cors());
const authRoute = require("./routes/auth.ts")

const  dbURI = `mongodb://${process.env.MONGO_ADDRESS}:${process.env.MONGO_PORT}/authentication`
app.use(express.json())
app.use('/api/auth', authRoute)

mongoose.connect(dbURI)
const db = mongoose.connection

db.on("error", (err)=>{console.error(err)})
db.once("open", () => {console.log("DB started successfully")})

app.listen(3333, () => {console.log("Server started: 3333")})