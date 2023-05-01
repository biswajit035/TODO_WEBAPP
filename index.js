const express = require('express')
const app = express()
var cors = require('cors')  // cors policy handle
app.use(cors())
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('dotenv').config();
const connectToMongo = require('./db')
const port = process.env.PORT || 8000;

const authentication = require('./Routes/auth')
const Task = require('./Routes/task')

// for testing 
app.get('/',(req,res)=>{
    res.send("backend is working")
})

// api 
app.use('/api/auth',authentication)
app.use('/api/task',Task)


// calling database and logging port
connectToMongo().then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}/`)
    })
})
