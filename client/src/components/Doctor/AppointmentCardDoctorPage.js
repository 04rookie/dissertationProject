import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import React from "react";
import { Typography } from "@material-ui/core";
import format from "date-fns/format";
function AppointmentCardDoctorPage(props) {
  function handleClick() {
    console.log(props);
  }
  return (
    <Card>
      <CardContent>
        <Typography component={"span"} variant="body2">
          {/* Start time: {props.startTime} <br /> End time: {props.endTime} */}
          {/* Start time: {props.startTime} */}
          Start time: {props.subs.startTime}
          <br /> End time: {props.subs.endTime}
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

export default AppointmentCardDoctorPage;
