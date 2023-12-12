const express = require("express")
const cors =require("cors")
const bodyParser = require("body-parser")

const app=express()

const PORT=4000

app.use(cors())
app.use(bodyParser.json())
let counter = 6


let  users = [{
    id:1,
    name:"Alpay",
    age:20
},{
    id:2,
    name:"Resad",
    age:20
},
{
    id:3,
    name:"Resad",
    age:20
}]

app.get("/",(req,res)=>{
    res.send("home page")
})

app.get("/about",(req,res)=>{
    res.send(users)
})

//get user by id
app.get("user/:id",(req,res)=>{
    const id=req.params.id
    //const {id} = req.params

    const selectUser=users.find(x=>x.id==id)

    if (selectUser) {
        res.send(selectUser)
        res.status(200).json({message:"user var"})
    }
    else{
        res.status(404).json({message:"user yoxdur"})
    }
})


//delete user
app.delete("/user/:id",(req,res)=>{
    const id=req.params.id
    const userId = users.find(x=>x.id==id)

    if (userId) {
        const DeletedUsers = users.filter(x=>x.id!=id)
        res.send(DeletedUsers)
        res.status(200).json({message:"user silindi"})
    }
    else{
        res.status(404),json({message:"tapilmadi"})
    }
})


//add user
app.post("/users",(req,res)=>{
    const userObject={
        id:counter++,
        name:req.body.name,
        age:req.body.age
    }

    users.push(userObject)
    res.send(users)
})


//update

app.put("/users/:id",(req,res)=>{
    const {id} = req.params
    users=users.filter(x=>x.id !=id)

    const updateUser={
        id:id,
        name:req.body.name,
        age:req.body.age,

    }

    users.push(updateUser)
    users.sort((a, b) => (a.id < b.id ? 1 : a.id > b.id ? -1 : 0));
    res.send(users)



})


app.get("/contact",(req,res)=>{
    res.send("Contact Page")
})


app.listen(PORT,()=>{
    console.log("Server is Connnect ");
})