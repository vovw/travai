import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import loginRoute from "./routes/userRoute.js"
let app = express()
dotenv.config()
const corsOption = {
    origin: ['http://localhost:5173'],
}
app.options('*', cors(corsOption))
app.use(cors(corsOption))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '1.5mb' }))
app.use(express.json())
import scrapeRoute from "./routes/scraperRoute.js"
import tripRoute from "./routes/tripRoute.js"

app.use("/user",loginRoute)
app.use("/scrape",scrapeRoute)
app.use('/trip',tripRoute)

try{
    mongoose.connect(process.env.MONGODB_URL)
    console.log(`database connected`)
    app.listen(process.env.PORT,()=>{
        console.log(`server working and running in port ${process.env.PORT}`);
    })
}
catch(e){
    console.log(e.message)
}