import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import React, { useContext } from "react";
import { Typography } from "@material-ui/core";
import CurrentUserId from "../Context/CurrentUserId";
function AppointmentCard(props) {
  const userId = useContext(CurrentUserId);
  function handleClick() {
  };
  return (
    <Card>
      <CardContent>
        <Typography component={'span'} variant="body2">
          {props.startTime} <br/>
          {props.endTime}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={handleClick}>
          Book
        </Button>
      </CardActions>
    </Card>
  );
}

export default AppointmentCard;
