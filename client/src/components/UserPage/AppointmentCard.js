import { Button, Card, CardActions, CardContent, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import format from "date-fns/format";
import { matchPath, useHistory, useLocation } from "react-router";
import axios from "axios";
function AppointmentCard(props) {
  let location = useLocation();
  const [doctorName, setDoctorName] = useState("");
  const dayMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let history = useHistory();
  useEffect(()=>{
    getDoctorName().then((response)=>{
      setDoctorName(response.data.doctorFirstName + " " + response.data.doctorLastName);
    });

  },[])

  async function getDoctorName(){
    const response = await axios.get("/api/public/doctor/" + props.subs.doctorID);
    return response;
  }

  function handleJoinClick() {
    getRoomFromServer().then((response) =>
      response.roomID === null
        ? postRoomToServer(response).then((responseFromPostRoomToServer) => {
            response.roomID = responseFromPostRoomToServer.data;
            loadRoomComponent(response);
          })
        : loadRoomComponent(response)
    );
  }

  async function getRoomFromServer() {
    try {
      const response = await axios.get(
        "/api/doctor/appointment/" + props.subs.appointmentID,
        {
          params: { doctorID: props.subs.doctorID },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function postRoomToServer(sub) {
    try {
      const response = await axios.patch(
        "/api/doctor/appointment/" + sub.appointmentID,
        sub,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  function loadRoomComponent(response) {
    console.log(response);
    history.push({
      pathname:
        "/doctor/" +
        response.doctorID +
        "/appointment/" +
        response.appointmentID +
        "/room/" +
        response.roomID,
      state: { data: response },
    });
  }

  return (
    <Grid spacing={3}>
    <Card sx={{width:"25vw", marginLeft:"5vw", marginBottom:"2.5vw", marginTop:"2.5vw", backgroundColor:"#EEEEEE"}}>
      <CardContent>
      <h1
          style={{
            color: "#222831",
            fontSize: ".8vw",
            fontFamily: "Montserrat",
          }}
        >
           Day: {dayMap[props.subs.day]}
        </h1>
        <h1
          style={{
            color: "#222831",
            fontSize: ".8vw",
            fontFamily: "Montserrat",
          }}
        >
           Appointment ID: {props.subs.appointmentID}
        </h1>
        <h1
          style={{
            color: "#222831",
            fontSize: ".8vw",
            fontFamily: "Montserrat",
          }}
        >
           Doctor ID: {props.subs.doctorID}
        </h1>
        <h1
          style={{
            color: "#222831",
            fontSize: ".8vw",
            fontFamily: "Montserrat",
          }}
        >
           Doctor Name: {doctorName}
        </h1>
        <h1
          style={{
            color: "#222831",
            fontSize: ".8vw",
            fontFamily: "Montserrat",
          }}
        >
           Starts at: {props.subs.startTime}
        </h1>
        <h1
          style={{
            color: "#222831",
            fontSize: ".8vw",
            fontFamily: "Montserrat",
          }}
        >
           Ends at: {props.subs.endTime}
        </h1>
      </CardContent>
      <CardActions>
        <Button variant="contained" style={{backgroundColor:"#222831", color:"#EEEEEE"}} onClick={handleJoinClick}>
          Join
        </Button>
      </CardActions>
    </Card>
    </Grid>
  );
}

export default AppointmentCard;
