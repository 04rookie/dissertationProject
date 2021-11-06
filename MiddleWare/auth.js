const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log("----")
    console.log(req.params.doctorID)
    const reqID = typeof req.params.userID==="undefined"?req.params.doctorID:req.params.userID; 
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.USER_TOKEN);
    const userID = decodedToken.userID;
    //console.log(userID + "user id")
    if (reqID!==userID) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.send({message: "noAccessRedirectToHome"})
  }
};
