var express = require("express")
var mongoose = require("mongoose")
var app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/StudentDBC")
.then(() => {
    console.log("connection is done");
})
.catch((err) =>{
    console.log("failed to connect" + err)
})

const studentsch = new mongoose.Schema({
    "name" : {type : String , required : true},
    "rollno" : {type : Number , required : true}
})
app.listen(2000,() =>{
     console.log("server started");
})

const student = new mongoose.model('student' , studentsch)
app.post('/studentpost',(req,res) =>{
    student.save(req.body)
    .then(() =>
         res.status(200).json("message"   + " : added suceesfully")
    )
    .catch((err) => 
         res.status(400).json(err + ": failed to connect")
    )
})

app.post('/studentpost', (req, res) => {
    const newStudent = new student({
        name: req.body.name,
        rollno: req.body.rollno
    });

    newStudent.save()
        .then(() =>
            res.status(200).json("Message : Added successfully")
        )
        .catch((err) =>
            res.status(400).json(err + ": Failed to connect")
        );
});






app.get("/student/:rollno", (req, res) => {
    const rollno = parseInt(req.params.rollno);   
    
    student.findOne({ rollno: rollno })  
        .then(student1 => {
            if (student1) {
                res.status(200).json({
                    "message": "Student found",
                    "student": student1
                });
            } else {
                res.status(404).json({ "message": "Student not found" });
            }
        })
        .catch((err) => {
            res.status(400).json({ "message": "Error", "error": err });
        });
});


app.get("/student", (req, res) => {
   
    
    student.find()  
        .then(student => {
            if (student) {
                res.status(200).json({
                    "message": "Student found",
                    "student": student
                });
            } else {
                res.status(404).json({ "message": "Student not found" });
            }
        })
        .catch((err) => {
            res.status(400).json({ "message": "Error", "error": err });
        });
});





app.delete("/student/:rollno", (req, res) => {
    const rollno =(req.params.rollno);  
    

    student.findOneAndDelete({ rollno: rollno })  
        .then(deletedStudent => {
            if (deletedStudent) {
                res.status(200).json({
                    "message": "Student deleted successfully",
                    "deletedStudent": deletedStudent
                });
            } else {
                res.status(404).json({
                    "message": "Student not found with this rollno"
                });
            }
        })
        .catch((err) => {
            res.status(400).json({
                "message": "Error deleting student",
                "error": err
            });
        });
});

app.put("/student/:name" , (req,res) =>{
      const studentname = req.params.name;
      const Updateddata = req.body;

      student.findOneAndUpdate({
        name : studentname},
        {$set : Updateddata},
        {new:true}
    )
    .then((updatedStudent) => {
        if(updatedStudent){
            res.json({message : "updated" , student : updatedStudent})
        }
        else{
            res.status(404).json({message: "failed"})
        }
    })
    .catch(err => res.status(500).json({error:err.message}))
})





