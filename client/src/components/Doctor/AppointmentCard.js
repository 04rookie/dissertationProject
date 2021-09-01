import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import React from "react";
import { Typography } from "@material-ui/core";
import format from "date-fns/format";
function AppointmentCard(props) {
  function handleClick() {
    props.setData((prev) => {
      const temp = { ...prev };
      temp.days[props.value] = temp.days[props.value].filter((valueFilter) => {
        return valueFilter.appointmentID !== props.appointmentID;
      });
      return temp;
    });
  }
  return (
    <Card>
      <CardContent>
        <Typography component={'span'} variant="body2">
          {/* Start time: {props.startTime} <br /> End time: {props.endTime} */}
          {/* Start time: {props.startTime} */}
          Start time: {format(props.startTime, "hh:mm")}
          <br /> End time: {format(props.endTime, "hh:mm")}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={handleClick}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default AppointmentCard;
