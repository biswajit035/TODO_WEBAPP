require('dotenv').config();

function test(req,res){
    res.send(`Routes is working fine ${process.env.backend_secret}`)
}
module.exports = { test }
