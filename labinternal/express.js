const express = require('express')
const mongoose = require('mongoose')
var app = express()
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() =>{
    console.log("Connection is estabished")
})
.catch(() =>{
    console.log("failed to connect")
})

const userschema = new mongoose.Schema({
    "name" : {type : String, required : true},
    "email" : {type : String, required : true},
    "password" : {type : String, required : true}
})

const productschema = new mongoose.Schema({
    "name" : {type : String, required : true},
    "price" : {type : Number, required : true},
    "description" : {type : String, required : false},
    "category" : {type : String, required : false},
    "stock" : {type : Number, required : false},
    "id" : {type : Number, required : true}
    })



const user = mongoose.model('user', userschema)
const products = mongoose.model('products', productschema)

app.get("/api/products",(req,res) =>{
    products.find().then((data) => {
        res.json({"message " : "products found" , "products" : data})
        })
        .catch((err) => {
            res.json(err)
    })
})

app.get("/api/products/:id", (req,res) =>{
    products.findById(req.params.id).then((data) => {
        res.json({"message : " : "product found", "product" : data})
        })
        .catch((err) => {
            res.json(err)
    })
})

app.put("/api/products/:id" , (req,res) =>{
    products.findByIdAndUpdate(req.params.id, req.body).then((data) => {
        if(data){
        res.json({"message : " : "product updated successfully" , "product" : data})
        }
    else{
        res.json({"message : " : "product not found"})
    }})
        .catch((err) => {
            res.json(err)
        })
})

app.delete("/api/products/:id" , (req,res) =>{
    products.findByIdAndDelete(req.params.id).then((data) => {
        if(data){
            res.json({"message : " : "product deleted successfully" , "product :" : data})
            res.json(data)

        }})
        .catch((err) => {
                res.json("Message :" , "product not found") 
        })
})

app.post("/api/products", (req,res) =>{
    products.create(req.body).then((data) => {
        res.json({"message" : "product created successfully" , "product" : data})
        })
        .catch((err) => {
            res.json("Message : " , "product  could not be created")
        })
})

app.listen(2000, () => {
    console.log("Server is running on port 2000")
})





                







