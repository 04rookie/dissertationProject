const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const axios = require("axios");
require('dotenv').config()
app.use(express.json());
app.use(express.static(path.join(__dirname, "/app")));
const port = 5000;
app.listen(process.env.PORT || port, ()=> console.log("Server started on port " + port));
const date = require('date-and-time');

mongoose.connect("***REMOVED***", {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    userID: String,
    userFirstName: String,
    userLastName: String,
    userEmail: String,
    userPassword: String,
    userJoinDate: String
});

const User = mongoose.model("User", userSchema);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/app'))
})

app.post("/Login", (req, res) => {
    User.findOne({userEmail: req.body.email, userPassword: req.body.loginPassword}, (err, foundUser)=> {
        if(err){
            console.log("Error inside findOne Query in server inside /Login");
            console.log(err);
        }
        else if(foundUser){
            let resObject = {userID:foundUser.userID ,userFirstName: foundUser.userFirstName, userLastName: foundUser.userLastName, userEmail: foundUser.userEmail, loginStatus: true};
            res.send(resObject);
            console.log("Login Successful")
        }
        else {
            let resObject = {userID:foundUser.userID ,userFirstName: null, userLastName: null, userEmail: null, loginStatus: false};
            res.send(resObject);
            console.log("Login Failed");
        }
    });
});

app.post("/register", (req, res) => {
    console.log(req.body);
    const id = makeid(20);
    const now = new Date();
    const userJoinDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    const newUser = new User({ userID: id, userFirstName: req.body.fName,
        userLastName: req.body.lName, userEmail: req.body.email,
        userPassword: req.body.registrationPassword,
        userJoinDate: userJoinDate});
    newUser.save((err) => {
        if(err){
            console.log(err);
            res.send({registerStatus: false});
        }
        else{
            console.log("Inserted.")
            res.send({registerStatus: true});
        }
    });
});

app.get("/user/:userID",(req, res)=>{
    const userID = req.params.userID;
    User.findOne({userID: userID}, (err, foundUser)=>{
        if(err){
            console.log("Error inside findOne Query in server inside /user");
            console.log(err);
        }
        else if(foundUser){
            let resObject = {userID:foundUser.userID ,userFirstName: foundUser.userFirstName, userLastName: foundUser.userLastName, userEmail: foundUser.userEmail, loginStatus: true, userJoinDate: foundUser.userJoinDate};
            res.send(resObject);
            console.log("user fetched");
        }
        else{
            let resObject = {userID:foundUser.userID ,userFirstName: null, userLastName: null, userEmail: null, loginStatus: false, userJoinDate: null};
            res.send(resObject);
            console.log("No user found");
        }
    })

})

function makeid(length) {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

async function postCreateRoom()
{
    try{
        let dynamicRoomName = makeid(10);
        const data = {roomName: dynamicRoomName};
        console.log("inside postCreateRoom Server.js beforePOST");
        const response = await axios.post("https://instahelp.metered.live/api/v1/room?secretKey=" + process.env.METERED_SECRET_KEY, data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        console.log(dynamicRoomName + "sv 88");
        return dynamicRoomName;
    }
    catch(error){
        console.log(error);
    }
}

app.post("/CreateRoom", (req, res)=>{
    console.log("inside server.js /CreateRoom");
    let dynamicRoomName = postCreateRoom().then((dynamicRoomName)=>{
        console.log(dynamicRoomName + "sv 99");
        res.send(dynamicRoomName);
    });
});

const roomNameSchema = new mongoose.Schema({
    roomName: String
})

const RoomName = mongoose.model("RoomName", roomNameSchema);

app.post("/PushRoomName", (req, res)=>{
    const roomName = new RoomName({roomName: req.body.roomName});
    roomName.save((err)=>{
        if(err){
            console.log(err);
            res.send({pushStatus: true});
        }
        else{
            res.send({pushStatus: false});
        }
    });
})

const doctorSchema = new mongoose.Schema({
    doctorID: String,
    doctorName: String,
    monday: Array,
    wednesday: Array,
    tuesday: Array,
    thursday: Array,
    friday: Array,
    saturday: Array,
    sunday: Array
})

const Doctor = mongoose.model("Doctor", doctorSchema);

app.post("/register-doctor", (req, res)=>{
    const id = makeid(20);
    const newDoctor = new Doctor({
        doctorID: id,
        doctorName: req.body.doctorName,
        monday: req.body.monday,
        wednesday: req.body.tuesday,
        tuesday: req.body.wednesday,
        thursday: req.body.thursday,
        friday: req.body.friday,
        saturday: req.body.saturday,
        sunday:req.body.sunday});
    newDoctor.save((err)=>{
        if(err){
            console.log(err);
            res.send(false);
        }
        else{
            console.log("success");
            res.send(true);
        }
    })
})

app.get("/doctor/:doctorID",(req, res)=>{
    const doctorID = req.params.doctorID;
    Doctor.findOne({doctorID: doctorID}, (err, foundUser)=>{
        if(err){
            console.log("Error inside findOne Query in server inside /doctor");
            console.log(err);
        }
        else if(foundUser){
            res.send(foundUser);
            console.log("user fetched");
        }
        else{
            res.send(false);
            console.log("No user found");
        }
    })

})