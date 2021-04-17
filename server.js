const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
app.get("/api/customers", (req, res) => {
    const customers = [{id: 1, fname: "atharva", lname: "jadhav"},
    {id: 2, fname: "rushikesh", lname: "bappur"},
    {id: 3, fname: "lemon", lname: "lime"}]
    res.json(customers);
})



const port = 5000;
app.listen(port, ()=> console.log("Server started on port " + port));


mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    userFirstName: String,
    userLastName: String,
    userEmail: String,
    userPassword: String
});

const User = mongoose.model("User", userSchema);

app.post("/Login", (req, res) => {
    User.findOne({userEmail: req.body.email, userPassword: req.body.loginPassword}, (err, foundUser)=> {
        if(err){
            console.log("Error inside findOne Query in server inside /Login");
            console.log(err);
        }
        else if(foundUser){
            res.send({loginStatus: true});
        }
        else {
            res.send({loginStatus: false});
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