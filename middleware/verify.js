const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


function verifyToken(req,res,next){
    const token = req.headers.token;
    if(!token) return res.status(401).json({"msg":"you are not authenticated"});
    jwt.verify(token,JWT_SECRET_KEY,(err,user)=>{
        if(err) return res.status(403).send({"msg":"Token is not valid"})
        req.user = user
        next()
    })
}
function verifyUser(req,res,next){
    verifyToken(req,res,()=>{
        next();
    })
}



module.exports = { verifyUser, verifyToken }