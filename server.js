const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const axios = require("axios");
require("dotenv").config();
app.use(express.json());
app.use(express.static(path.join(__dirname, "/app")));
const port = 5000;
app.listen(process.env.PORT || port, () =>
  console.log("Server started on port " + port)
);
const date = require("date-and-time");
const { format } = require("date-fns");

//Connecting to mongo db on atlas.
mongoose.connect(
  "***REMOVED***",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//Defining user Schema
const userSchema = new mongoose.Schema({
  userID: String,
  userFirstName: String,
  userLastName: String,
  userEmail: String,
  userPassword: String,
  userJoinDate: String,
});

//Creating model based on schema
const User = mongoose.model("User", userSchema);

//This route will serve homepage
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/app"));
});

//handling the post request to login
app.post("/api/login", (req, res) => {
  User.findOne(
    { userEmail: req.body.email, userPassword: req.body.loginPassword },
    (err, foundUser) => {
      if (err) {
        console.log("Error inside findOne Query in server inside /Login");
        console.log(err);
      } else if (foundUser) {
        let resObject = {
          userID: foundUser.userID,
          userFirstName: foundUser.userFirstName,
          userLastName: foundUser.userLastName,
          userEmail: foundUser.userEmail,
          loginStatus: true,
        };
        res.send(resObject);
        console.log("Login Successful");
      } else {
        let resObject = {
          userID: foundUser.userID,
          userFirstName: null,
          userLastName: null,
          userEmail: null,
          loginStatus: false,
        };
        res.send(resObject);
        console.log("Login Failed");
      }
    }
  );
});

//handling the post request to register user
app.post("/api/register", (req, res) => {
  console.log(req.body);
  const id = makeid(20);
  const now = new Date();
  const userJoinDate = date.format(now, "YYYY/MM/DD HH:mm:ss");
  const newUser = new User({
    userID: id,
    userFirstName: req.body.fName,
    userLastName: req.body.lName,
    userEmail: req.body.email,
    userPassword: req.body.registrationPassword,
    userJoinDate: userJoinDate,
  });
  newUser.save((err) => {
    if (err) {
      console.log(err);
      res.send({ registerStatus: false });
    } else {
      console.log("Inserted.");
      res.send({ registerStatus: true });
    }
  });
});

//fetch user data for user page
app.get("/api/user/:userID", (req, res) => {
  const userID = req.params.userID;
  User.findOne({ userID: userID }, (err, foundUser) => {
    if (err) {
      console.log("Error inside findOne Query in server inside /user");
      console.log(err);
    } else if (foundUser) {
      let resObject = {
        userID: foundUser.userID,
        userFirstName: foundUser.userFirstName,
        userLastName: foundUser.userLastName,
        userEmail: foundUser.userEmail,
        loginStatus: true,
        userJoinDate: foundUser.userJoinDate,
      };
      res.send(resObject);
      console.log("user fetched");
    } else {
      let resObject = {
        userID: foundUser.userID,
        userFirstName: null,
        userLastName: null,
        userEmail: null,
        loginStatus: false,
        userJoinDate: null,
      };
      res.send(resObject);
      console.log("No user found");
    }
  });
});

// generates random string of given length
function makeid(length) {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//creates room in metered
async function postCreateRoom() {
  try {
    let dynamicRoomName = makeid(20);
    const data = { roomName: dynamicRoomName };
    console.log("inside postCreateRoom Server.js beforePOST");
    const response = await axios.post(
      "https://instahelp.metered.live/api/v1/room?secretKey=" +
        process.env.METERED_SECRET_KEY,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    console.log(dynamicRoomName + "sv 88");
    return dynamicRoomName;
  } catch (error) {
    console.log(error);
  }
}

//handles create room call to the api from front end
app.post("/CreateRoom", (req, res) => {
  console.log("inside server.js /CreateRoom");
  let dynamicRoomName = postCreateRoom().then((dynamicRoomName) => {
    console.log(dynamicRoomName + "sv 99");
    res.send(dynamicRoomName);
  });
});

//room schema
const roomNameSchema = new mongoose.Schema({
  roomName: String,
});

const RoomName = mongoose.model("RoomName", roomNameSchema);

app.post("/PushRoomName", (req, res) => {
  const roomName = new RoomName({ roomName: req.body.roomName });
  roomName.save((err) => {
    if (err) {
      console.log(err);
      res.send({ pushStatus: true });
    } else {
      res.send({ pushStatus: false });
    }
  });
});

//doctor schema
const doctorSchema = new mongoose.Schema({
  doctorID: String,
  doctorName: String,
  appointment: [
    {
      appointmentID: String,
      day: Number,
      startTime: String,
      endTime: String,
      status: String,
      userID: String,
    },
  ],
});

const Doctor = mongoose.model("Doctor", doctorSchema);

//generates a doctor with a unique id
app.post("/api/register-doctor", (req, res) => {
  const id = makeid(20);
  const newDoctor = new Doctor({
    doctorID: id,
    doctorName: req.body.doctorName,
  });
  newDoctor.save((err) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      console.log("success");
      res.send(true);
    }
  });
});

//to fetch data of a particular doctor
app.get("/api/doctor/:doctorID", (req, res) => {
  const doctorID = req.params.doctorID;
  Doctor.findOne({ doctorID: doctorID }, (err, foundUser) => {
    if (err) {
      console.log("Error inside findOne Query in server inside /doctor");
      console.log(err);
    } else if (foundUser) {
      res.send(foundUser);
      console.log("user fetched");
    } else {
      res.send(false);
      console.log("No user found");
    }
  });
});

//to make changes to doctor appointment schema
app.post("/api/edit-slot/:doctorID", (req, res) => {
  const doctorID = req.params.doctorID;
  console.log(req.body);
  Doctor.findOne({ doctorID: doctorID }, (err, foundUser) => {
    if (err) {
      console.log("Error inside findOne Query in server inside /editslot");
      console.log(err);
    } else if (foundUser) {
      //console.log(req.body.days[0][0]);
      //format(req.body.startTime, "hh:mm")
      let appointmentObject = foundUser.appointment;
      let data = {
        appointmentID: null,
        day: null,
        startTime: null,
        endTime: null,
        status: null,
        userID: null,
      };
      let days = req.body;
      for (let outer = 0; outer < days.length; outer++) {
        for (let inner = 0; inner < days[outer].length; inner++) {
          data.day = outer;
          data.startTime = days[outer][inner].startTime;
          data.endTime = days[outer][inner].endTime;
          data.status = "open";
          data.userID = null;
          appointmentObject.push(data);
        }
      }
      console.log(appointmentObject);
      foundUser.save();
      res.send(true);
      console.log("posted user data to mongodb");
    } else {
      res.send(false);
      console.log("failed");
    }
  });
});

app.get("/api/doctor", (req, res) => {
  const skipValue = parseInt(req.query.skipValue);
  Doctor.find({}, null, { skip: skipValue, limit: 10 }, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else if (foundUser) {
      console.log("sending doctors");
      res.send(foundUser);
    } else {
      console.log("no users found in /doctor");
    }
  });
});

app.get("/api/booking/:doctorID", (req, res) => {
  const doctorIDRequest = req.params.doctorID;
  Doctor.findOne({ doctorID: doctorIDRequest }, (err, foundUser) => {
    if (err) {
      console.log(err);
      console.log("Error inside /booking");
      res.send(null);
    } else if (foundUser) {
      foundUser.appointment = foundUser.appointment.filter((record) => {
        return record.status === "open";
      });
      res.send(foundUser);
      console.log("Appointments fetched");
    } else {
      console.log("user not found");
      res.send(null);
    }
  });
});

app.post("/api/booking/:doctorID", (req, res) => {
  const doctorIDRequest = req.params.doctorID;
  let data = [];
  req.body.map((days) => {
    days.map((record) => {
      if (record.status === "reserved") {
        data.push(record);
      }
    });
  });
  Doctor.findOne({ doctorID: doctorIDRequest }, (err, foundUser) => {
    if (err) {
      console.log(err);
      console.log("Error inside /booking/:doctorID");
      res.send(null);
    } else if (foundUser) {
      data.map((newData) => {
        foundUser.appointment = foundUser.appointment.map((record) => {
          if (
            newData.startTime === record.startTime &&
            newData.day === record.day
          ) {
            record = newData;
          }
          return record;
        });
      });
      foundUser.save();
    } else {
      console.log("User not found inside /booking/:doctorID");
    }
  });
});
