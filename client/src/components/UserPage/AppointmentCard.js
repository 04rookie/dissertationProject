import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import React from "react";
import { Typography } from "@material-ui/core";
import format from "date-fns/format";
import { matchPath, useHistory, useLocation } from "react-router";
import axios from "axios";
function AppointmentCard(props) {
  let location = useLocation();
  let history = useHistory();
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
    <Card>
      <CardContent>
        <Typography component={"span"} variant="body2">
          Start time: {props.subs.startTime} <br />
          End time: {props.subs.endTime}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={handleJoinClick}>
          Join
        </Button>
      </CardActions>
    </Card>
  );
}

export default AppointmentCard;
