import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import React from "react";
import { Typography } from "@material-ui/core";
import format from "date-fns/format";
function AppointmentCard(props) {
  function handleClick() {
    if (props.appointmentID === null && props.status === "open") {
      props.setData((prev) => {
        const temp = { ...prev };
        temp.days[props.value] = temp.days[props.value].filter(
          (valueFilter) => {
            return valueFilter.appointmentID !== props.appointmentID;
          }
        );
        return temp;
      });
    }
    else{
      console.log(props.appointmentID);
      console.log(props.status);
      console.log("cant update, slot already assigned");
    }
  }
  return (
    <Card>
      <CardContent>
        <Typography component={"span"} variant="body2">
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
