require('dotenv').config()

const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

const DB = require('./models/DB')
DB()

const userroutes = require('./routes/user')
app.use(express.json())
app.use(cookieParser())
app.use('/api', userroutes)

app.get('/',(req,res)=>{
    res.send('Hello World')
})



const PORT = process.env.PORT || 6000

app.listen(PORT,()=>{
    console.log(`server is runing on port${PORT}`)

})


