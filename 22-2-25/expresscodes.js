const express = require('express')
var app = express()
let students = [ {"name" : "nishritha" , "id" : 24},
    {"name" : "Nishka" , "id" : 5},
    {"name" : "niharika" , "id" : 13}
];
app.get("/students",(req,res) =>{
    res.json(students)
})

app.get("/student/:id",(req,res) =>{
    const id = req.params.id
    let student = students.find(s => s.id==id)
    if(student){
        res.status(200).json({
            "message" : "student found",
            "student" : student
        })
    }
    else{
        res.status(404).json({"message" : "student not found"})
    }
})

app.delete("/deletestudent/:id",(req,res) => {
    const id = req.params.id
    let stu = students.find(s => s.id==id)
    if(stu){
    students = students.filter(s => s.id != id)
    res.status(200).json({
        "message" : "Deleted successfully",
        "students" : students
    })
    }
    else{
        res.status(404).json({"message" : "student not found"})
    } 
})

 
app.post("/addstudent",(req,res) => {
    let student = req.body
    students.push(student)
    res.status(200).json({
        "message" : "student added successfully",
        "students" : students
    })
})
app.use(express.json())
app.put("/updatestudent/:id",(req,res) =>{
    const id = req.params.id
    let studentind = students.findIndex(s => s.id==id)
    if(studentind != -1){
        if (req.body.name) { // Ensure the name is provided
            students[studentind].name = req.body.name;
            res.status(200).json({
                "message": "Updated successfully",
                "students": students
            });
        } else {
            res.status(400).json({"message": "Name is required"});
        }
    }
    else{
                res.status(404).json({"message" : "student not found"})
             }
})

app.listen(2000,() =>{
    console.log("server started")
})
