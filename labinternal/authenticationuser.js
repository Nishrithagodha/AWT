const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json())

app.post("/api/login" , (req , res) => {
    const { username , password } = req.body;
    if (username === "user" && password === "user") {
        const token = jwt.sign({ username }, 'usersecret');
             res.json({ token });
            }
    else{
        res.status(401).json({ message: 'Invalid username or password' });
    }
})

app.get("/api/pro" , AuthenticationUser , (req , res) => {
    res.json({ message: 'Hello from protected route' });

})

app.post("/api/register", (req, res) => {
    const { username, password } = req.body;
    res.json({ message: 'User created successfully' });
})


function AuthenticationUser(req , res , next) {
    const authheader = req.header();
    if(authheader){
        const token = authheader.split(' ')[1];
        jwt.verify(token , 'usersecret' , (err , user) => {
            if(err){
                return res.status(403).json({ message: 'Invalid token' });
            }
            req.user = user;
            next();
        });
    }
    else{
        return res.status(401).json({ message: ' token is missing.' });
    }
}

app.listen(2000, () =>{
    console.log('Server is running on port 2000');
})



