import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import React from "react";
import { Typography } from "@material-ui/core";
import format from "date-fns/format";
function AppointmentCard(props) {
  return (
    <Card>
      <CardContent>
        <Typography component={"span"} variant="body2">
          {/* Start time: {props.startTime} <br /> End time: {props.endTime} */}
          Start time: {format(props.startTime, 'hh:mm')}<br/> End time: {format(props.startTime, 'hh:mm')}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined">Delete</Button>
      </CardActions>
    </Card>
  );
}

export default AppointmentCard;
