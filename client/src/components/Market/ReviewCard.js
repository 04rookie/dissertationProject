import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import React from "react";
import { Typography } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";

function ReviewCard(props) {
  return (
    <Card sx={{ width: 345 }}>
      <CardContent>
        <Typography component={"div"} variant="body2">
          {props.data.doctorID}
        </Typography>
        <Typography component={"div"} variant="body2">
        {props.data.userID}
        </Typography>
        <Typography component={"div"} variant="body2">
        {props.data.reviewDate}
        </Typography>
        <Typography component={"div"} variant="body2">
        {props.data.rating}
        </Typography>
        <Typography component={"div"} variant="body2">
        {props.data.reviewTitle}
        </Typography>
        <Typography component={"div"} variant="body2">
        {props.data.reviewText}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ReviewCard;
