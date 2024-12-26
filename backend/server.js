const express = require("express")
const dotEnv = require("dotenv")
const mongoose = require("mongoose")
//const bodyParser = require("body-parser") we can use express.json function replace the bodyparser
const taskRoutes = require("./routes/tasks")

const cors = require("cors")
const app = express()
app.use(cors())
/*const corsOptions = {
    origin: 'http://localhost:3004', // Add your frontend URL here
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};*/

app.use(cors(corsOptions));
app.use(express.json())
dotEnv.config()
mongoose.connect(process.env.MANGO_URI)
.then(()=>{
    console.log("mongoDb connected successfully")
})
.catch((error)=>{
    console.log("Error", error)
})

const PORT = process.env.PORT || 4000
app.use('/tasks',taskRoutes)

app.listen(PORT,()=>{
    console.log(`Server Running at ${PORT}}`)
})