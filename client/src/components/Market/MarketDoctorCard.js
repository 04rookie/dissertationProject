import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import React from "react";
import { Typography } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";

function MarketDoctorCard(props) {
  let history = useHistory();
  function handleClick() {
    getServerDoctorAppointment();
  }

  async function getServerDoctorAppointment() {
    try {
      history.push({ pathname: "/booking/" + props.doctorID });
    } catch (error) {
      console.log(error);
    }
  }
  
  function callHandleClickReviews(){
    props.handleClickReviews(props.doctorID);
  }

  return (
    <Card>
      <CardContent>
        <Typography component={"span"} variant="body2">
          {props.doctorID} <br />
          {props.doctorName}
          {props.doctorRate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={handleClick}>
          Book
        </Button>
        <Button variant="outlined" onClick={callHandleClickReviews}>
          Show Reviews
        </Button>
      </CardActions>
    </Card>
  );
}

export default MarketDoctorCard;
