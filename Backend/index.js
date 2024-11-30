
const dotenv = require('dotenv').config()
const express = require('express');
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Auth = require("./Routes/auth")
const Task = require("./Routes/taskSequences")
const User = require("./Routes/user")
const {agenda} = require("./agenda")
const cors = require("cors")

app.use(cors())

app.use(bodyParser.json())
app.use(express.json())
app.use("/api/auth",Auth)
app.use("/api/task",Task)
app.use("/api/user",User)


mongoose.connect(process.env.MONGO_URL).then(()=> console.log('mongodb connected')).catch((error)=> console.log(error))
app.listen(3000, async () => {
    try {
        await agenda.start()
        console.log("agenda started")
    console.log('server running ')
    } catch (error) {
        console.log(error)
    }
})