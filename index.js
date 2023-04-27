const express = require('express')
const port = process.env.PORT || 8000;
require('dotenv').config();

const controller = require('./Routes/test')


const app = express()

app.get('/',(req,res)=>{
    res.send("backend is working")
})

app.use('/test',controller)

app.listen(port, () => {
    console.log("you are listening to port: " + `http://localhost:${port}/`);
})