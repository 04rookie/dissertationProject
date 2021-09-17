import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import React from "react";
import { Typography } from "@material-ui/core";
import format from "date-fns/format";
import { matchPath, useLocation } from "react-router";
import axios from "axios";
function AppointmentCard(props) {
  let location = useLocation();
  function handleJoinClick() {
    console.log(props);
    getRoomFromServer();
  }

  async function getRoomFromServer() {
    try {
      const response = await axios.get("/api/room/" + props.appointmentID);
      return response
    } catch (error) {
      console.log(error);
    }
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
