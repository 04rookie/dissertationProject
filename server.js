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
  process.env.MONGO_DB_URL_KEY,
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
  userSubscription: [{ doctorID: String, appointmentID: String }],
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
        const userSubscription = null;
        if (!foundUser.userSubscription.length === 0) {
          userSubscription = foundUser.userSubscription;
        }
        let resObject = {
          userID: foundUser.userID,
          userFirstName: foundUser.userFirstName,
          userLastName: foundUser.userLastName,
          userEmail: foundUser.userEmail,
          loginStatus: true,
          userSubscription: userSubscription,
        };
        res.send(resObject);
        console.log("Login Successful");
      } else {
        let resObject = {
          userID: null,
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

app.post("/api/login/doctor", (req, res) => {
  Doctor.findOne(
    { doctorEmail: req.body.email, doctorPassword: req.body.loginPassword },
    (err, foundUser) => {
      if (err) {
        console.log(
          "Error inside findOne Query in server inside /Login/doctor"
        );
        console.log(err);
      } else if (foundUser) {
        let resObject = {
          doctorID: foundUser.doctorID,
          doctorFirstName: foundUser.doctorFirstName,
          doctorLastName: foundUser.doctorLastName,
          doctorEmail: foundUser.doctorEmail,
          loginStatus: true,
        };
        res.send(resObject);
        console.log("Login Successful");
      } else {
        let resObject = {
          doctorID: null,
          doctorFirstName: null,
          doctorLastName: null,
          doctorEmail: null,
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
  User.findOne({ userID: userID }, async (err, foundUser) => {
    if (err) {
      console.log("Error inside findOne Query in server inside /user");
      console.log(err);
    } else if (foundUser) {
      let doctorIDs = [];
      foundUser.userSubscription.forEach((record) => {
        doctorIDs.push(record.doctorID);
      });
      const records = await Doctor.find({ doctorID: { $in: doctorIDs } });
      let doctorAppointments = [];
      var foundDoc = null;
      foundUser.userSubscription.forEach((sub) => {
        foundDoc = records.filter((doctor) => {
          return doctor.doctorID === sub.doctorID;
        });
        foundDoc = foundDoc[0];
        const appointmentObject = foundDoc.appointment.filter(
          (appointmentObject) => {
            return appointmentObject.appointmentID === sub.appointmentID;
          }
        );
        doctorAppointments.push(appointmentObject[0]);
      });
      let resObject = {
        userID: foundUser.userID,
        userFirstName: foundUser.userFirstName,
        userLastName: foundUser.userLastName,
        userEmail: foundUser.userEmail,
        loginStatus: true,
        userJoinDate: foundUser.userJoinDate,
        userSubscription: doctorAppointments,
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
        userSubscription: null,
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
async function postRoom(roomInfo) {
  try {
    const data = { roomName: roomInfo.roomID };
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
    const newRoom = new Room({
      roomName: roomInfo.roomID,
    });
    newRoom.save((err) => {
      if (err) {
        console.log("error inside newRoom.save");
      } else {
        console.log("room inserted");
      }
    });
    return true;
  } catch (error) {
    console.log(error);
  }
}

//handles create room call to the api from front end
app.post("/api/metered/room/:roomID", (req, res) => {
  findRoom(req.params.roomID).then((success) =>
    success === true
      ? res.send("roomExists")
      : postRoom(req.body).then((booleanValue) => res.send("roomCreated"))
  );
});

async function findRoom(roomID) {
  Room.findOne({ roomName: roomID }, (err, foundUser) => {
    console.log(foundUser + "GOT THE ROOM");
    if (err) {
      console.log(err);
    } else if (foundUser) {
      return true;
    } else if (!foundUser) {
      return false;
    } else {
      console.log("error inside findroom");
      return null;
    }
  });
}
// room schema
const roomSchema = new mongoose.Schema({
  roomName: String,
});

const Room = mongoose.model("Room", roomSchema);

// app.post("/PushRoomName", (req, res) => {
//   const roomName = new RoomName({ roomName: req.body.roomName });
//   roomName.save((err) => {
//     if (err) {
//       console.log(err);
//       res.send({ pushStatus: true });
//     } else {
//       res.send({ pushStatus: false });
//     }
//   });
// });

//doctor schema
const doctorSchema = new mongoose.Schema({
  doctorID: String,
  doctorFirstName: String,
  doctorLastName: String,
  doctorPassword: String,
  doctorEmail: String,
  doctorRate: Number,
  appointment: [
    {
      appointmentID: String,
      day: Number,
      startTime: String,
      endTime: String,
      status: String,
      userID: String,
      doctorID: String,
      roomID: String,
    },
  ],
});

const Doctor = mongoose.model("Doctor", doctorSchema);

//generates a doctor with a unique id
app.post("/api/register-doctor", (req, res) => {
  const id = makeid(20);
  req.body.doctorRate = Number(req.body.doctorRate)
  const newDoctor = new Doctor({
    doctorID: id,
    doctorFirstName: req.body.doctorFirstName,
    doctorLastName: req.body.doctorLastName,
    doctorPassword: req.body.doctorPassword,
    doctorEmail: req.body.doctorEmail,
    doctorRate: req.body.doctorRate,
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
      foundUser.doctorPassword = null;
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
  Doctor.findOne({ doctorID: doctorID }, (err, foundUser) => {
    if (err) {
      console.log("Error inside findOne Query in server inside /editslot");
      console.log(err);
    } else if (foundUser) {
      //console.log(req.body.days[0][0]);
      //format(req.body.startTime, "hh:mm")
      foundUser.appointment = [];
      let appointmentObject = foundUser.appointment;
      foundUser.markModified("appointment");
      let data = {
        appointmentID: null,
        day: null,
        startTime: null,
        endTime: null,
        status: null,
        userID: null,
        doctorID: null,
        roomID: null,
      };
      let days = req.body;
      for (let outer = 0; outer < days.length; outer++) {
        for (let inner = 0; inner < days[outer].length; inner++) {
          data.appointmentID = days[outer][inner].appointmentID;
          data.day = days[outer][inner].day;
          data.startTime = days[outer][inner].startTime;
          data.endTime = days[outer][inner].endTime;
          data.status = days[outer][inner].status;
          data.userID = days[outer][inner].userID;
          data.doctorID = days[outer][inner].doctorID;
          data.roomID = days[outer][inner].roomID;
          appointmentObject.push(data);
          //foundUser.markModified('appointment');
        }
      }
      //foundUser.markModified('appointment');
      foundUser.save();
      res.send(true);
      console.log("posted user data to mongodb");
    } else {
      res.send(false);
      console.log("failed");
    }
  });
});

app.get("/api/edit-slot/:doctorID", (req, res) => {
  const reqDoctorId = req.params.doctorID;
  Doctor.findOne({ doctorID: reqDoctorId }, (err, foundUser) => {
    if (err) {
      console.log(err);
      console.log("365");
    } else if (foundUser) {
      res.send(foundUser.appointment);
    } else {
      console.log("371 error");
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
    } else {
      console.log("user not found");
      res.send(null);
    }
  });
});

app.patch("/api/booking/:doctorID", (req, res) => {
  const doctorIDRequest = req.params.doctorID;
  let data = [];
  req.body.map((days) => {
    days.map((record) => {
      if (record.status === "reserved") {
        data.push(record);
      }
    });
  });
  data.map((record) => {
    User.findOne({ userID: record.userID }, (err, foundUser) => {
      if (err || !foundUser) {
        console.log("Error inside  /booking/:doctorID");
      } else if (foundUser) {
        foundUser.userSubscription.push({
          doctorID: doctorIDRequest,
          appointmentID: record.appointmentID,
        });
        foundUser.save();
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

app.get("/api/doctor/appointment/:appointmentID", (req, res) => {
  const appointmentIDRequest = req.params.appointmentID;
  const doctorIDRequest = req.query.doctorID;
  Doctor.findOne(
    {
      doctorID: doctorIDRequest,
      "appointment.appointmentID": appointmentIDRequest,
    },
    (err, foundUser) => {
      if (err) {
        console.log(err);
      } else if (foundUser) {
        let subs = foundUser.appointment.filter(
          (subs) => subs.appointmentID === appointmentIDRequest
        );
        subs = subs[0];
        res.send(subs);
      } else {
        console.log("not found in room/appointment id");
      }
    }
  );
});

app.patch("/api/doctor/appointment/:appointmentID", (req, res) => {
  const appointmentIDRequest = req.params.appointmentID;
  const doctorIDRequest = req.body.doctorID;
  const roomID = makeid(20);
  //const result = Doctor.findOneAndUpdate({doctorID: doctorIDRequest, 'appointment.appointmentID':appointmentIDRequest}, {$set:{'appointment.$.roomID':roomID}},{overwrite:true, useFindAndModify:true, new:true})
  // console.log(result);
  Doctor.findOne(
    {
      doctorID: doctorIDRequest,
      "appointment.appointmentID": appointmentIDRequest,
    },
    (err, foundUser) => {
      if (err) {
        console.log(err);
      } else if (foundUser) {
        foundUser.appointment.forEach((sub) =>
          sub.appointmentID === appointmentIDRequest
            ? (sub.roomID = roomID)
            : {}
        );
        foundUser.markModified("appointment");
        foundUser.save();
        res.send(roomID);
      } else {
        console.log("error in /api/doctor/appointment/:appointmentID");
      }
    }
  );
});

app.delete("/api/room/:roomID", (req, res) => {
  const roomID = req.params.roomID;
  deleteRoomFromMetered(roomID).then((responseFromMeteredDeleteRoom) =>
    res.send(true)
  );
});

async function deleteRoomFromMetered(roomID) {
  const responseFromMeteredDeleteRoom = await axios.delete(
    "https://instahelp.metered.live/api/v1/room/" + roomID + "?secretKey=" +
    process.env.METERED_SECRET_KEY,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return responseFromMeteredDeleteRoom;
}
