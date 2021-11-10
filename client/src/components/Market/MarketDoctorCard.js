import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
} from "@material-ui/core";
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

  function callHandleClickReviews() {
    props.handleClickReviews(props.doctorID);
  }

  return (
    <Grid item align="center" xs={6}>
      <Card style={{backgroundColor:"#222831", padding:"2vw"}}>
        <CardContent align="left">
          <h1
            style={{
              color: "#EEEEEE",
              fontSize: ".8vw",
              fontFamily: "Montserrat",
            }}
          >
            Dr. {props.doctorName} <br />
            {props.doctorRate} Rs. per session 
          </h1>
        </CardContent>
        <CardActions>
          <Button variant="contained" style={{Color:"#EEEEEE", backgroundColor:"#393E46"}} onClick={handleClick}>
            Book
          </Button>
          <Button variant="contained" style={{Color:"#EEEEEE", backgroundColor:"#393E46"}} onClick={callHandleClickReviews}>
            Show Reviews
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default MarketDoctorCard;
