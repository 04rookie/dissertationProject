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


mongoose.connect("***REMOVED***", {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    userFirstName: String,
    userLastName: String,
    userEmail: String,
    userPassword: String
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
            let resObject = {userFirstName: foundUser.userFirstName, userLastName: foundUser.userLastName, userEmail: foundUser.userEmail, loginStatus: true};
            res.send(resObject);
            console.log("Login Successful")
        }
        else {
            let resObject = {userFirstName: null, userLastName: null, userEmail: null, loginStatus: false};
            res.send(resObject);
            console.log("Login Failed");
        }
    });
});

app.post("/Register", (req, res) => {
    console.log(req.body);
    const newUser = new User({userFirstName: req.body.fName,
        userLastName: req.body.lName, userEmail: req.body.email,
        userPassword: req.body.registrationPassword});
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
