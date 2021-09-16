import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import React from "react";
import { Typography } from "@material-ui/core";
import format from "date-fns/format";
function AppointmentCard(props) {
  function handleClick() {
    console.log(props);
  }
  return (
    <Card>
      <CardContent>
        <Typography component={'span'} variant="body2">
          Start time: {props.startTime} <br/>
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={handleClick}>
          Join
        </Button>
      </CardActions>
    </Card>
  );
}

export default AppointmentCard;
