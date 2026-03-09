const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/jobportal")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

/* Models */

const User = mongoose.model("User",{
name:String,
email:String,
password:String
});

const Job = mongoose.model("Job",{
title:String,
company:String,
location:String
});

/* Home */

app.get("/", (req, res) => {
res.send("Job Portal Backend Running");
});

/* Register API */

app.post("/register", async (req,res)=>{

const {name,email,password} = req.body;

const newUser = new User({
name,
email,
password
});

await newUser.save();

console.log("User saved in database");

res.send("User registered successfully");

});

/* Login API */

app.post("/login", async (req,res)=>{

const {email,password} = req.body;

const user = await User.findOne({email,password});

if(user){
res.send("Login successful");
}else{
res.send("Invalid email or password");
}

});

/* Add Job API */

app.post("/addjob", async (req,res)=>{

const {title,company,location} = req.body;

const newJob = new Job({
title,
company,
location
});

await newJob.save();

res.send("Job added successfully");

});

/* Get Jobs API */

app.get("/jobs", async (req,res)=>{

const jobs = await Job.find();

res.json(jobs);

});
/* Job Count API */

app.get("/jobcount", async (req,res)=>{

const count = await Job.countDocuments();

res.json({total:count});

});
app.listen(5000,()=>{
console.log("Server running on port 5000");
});