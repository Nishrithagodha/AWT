const express = require("express")
const jwt = require("jsonwebtoken")
var app = express()
app.use(express.json())
app.post("/login",(req,res) => {
    const{username , password} = req.body
    if((username=="cvr") && (password=="cvr")){
        const token = jwt.sign({username , password},"cvrcollege")
        res.json(token)
    }
    else{
        res.status(400).json({"message" : "invalid user"})
    }
})

app.get("/protected",authenticanToken,(req,res) => {
    res.json({"message" : "welcome to home page"})
})

app.get("/studnet",(req,res) => {
    res.json({"mesaage" : "Hi"})
})




function authenticanToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ "message": "Authorization header is missing" });
    }

    const token = authHeader.split(' ')[1];  
    if (!token) {
        return res.status(401).json({ "message": "Token missing" });
    }

    jwt.verify(token, "cvrcollege", (err, decoded) => {
        if (err) {
            return res.status(401).json({ "message": "Invalid token. Please log in first." });
        } else {
            req.user = decoded;  
            next(); 
        }
    });
}


app.listen(2000,() =>{
    console.log("server started")
})


