const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req,res,next)=>{
    var token;
    var autherheader = req.headers.Authorization || req.headers.authorization
    console.log(autherheader,">>>>>>>");
    if ( autherheader && autherheader.startsWith("Bearer")){
        token = autherheader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECERT, (err,decoded) => {
            if(err){
                res.status(401);
                throw new Error ("user is un authorized");
            };
            console.log(decoded.user,"decoded");
            req.user = decoded.user
            next();
        });
       if(!token){
        res.status(401);
        throw new Error("user is not authorized")
       } 
    }
});

module.exports = validateToken;