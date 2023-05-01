const express = require('express')
const bodyParser = require('body-parser');
const connectToMongo = require('./db')
var cors = require('cors')  // cors policy handle
const port = process.env.PORT || 8000;
const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('dotenv').config();

const authentication = require('./Routes/auth')
const Task = require('./Routes/task')



app.get('/',(req,res)=>{
    res.send("backend is working")
})

app.use('/api/auth',authentication)
app.use('/api/task',Task)


connectToMongo().then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}/`)
    })
})
