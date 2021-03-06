import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import CurrentUserId from "../Context/CurrentUserId";
import axios from "axios";
function AppointmentCard(props) {
  const userId = useContext(CurrentUserId);
  function handleClick() {
    if (props.appointmentData.status === "open") {
      props.setData((prev) => {
        let dayData = prev[props.appointmentData.day];
        for (let i = 0; i < dayData.length; i++) {
          if (dayData[i].startTime === props.appointmentData.startTime) {
            dayData[i].appointmentID = makeid(20);
            dayData[i].userID = userId;
            dayData[i].status = "reserved";
            dayData[i].roomID = null;
          }
        }
        return [...prev];
      });
    } else if (props.appointmentData.status === "reserved") {
      props.setData((prev) => {
        let dayData = prev[props.appointmentData.day];
        for (let i = 0; i < dayData.length; i++) {
          if (dayData[i].startTime === props.appointmentData.startTime) {
            dayData[i].appointmentID = null;
            dayData[i].userID = null;
            dayData[i].status = "open";
            dayData[i].roomID = null;
          }
        }
        return [...prev];
      });
    }
  }

  function makeid(length) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <Grid item xs={3}>
      <Card style={{ color: "#EEEEEE", backgroundColor: "#393E46", padding:"2vw" }}>
        <CardContent>
          <h1
            style={{
              color: "#EEEEEE",
              fontSize: ".8vw",
            }}
          >
            Starts at: {props.appointmentData.startTime}
            <br /> Ends at: {props.appointmentData.endTime}
          </h1>
        </CardContent>
        <CardActions>
          <Button style={{ color: "#393E46", backgroundColor: "#EEEEEE" }} variant="contained" onClick={handleClick}>
            {props.appointmentData.status === "open"
              ? "Add to cart"
              : "Remove from cart"}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default AppointmentCard;
