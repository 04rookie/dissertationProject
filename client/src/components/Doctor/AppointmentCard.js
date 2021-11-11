import { Button, Card, CardActions, CardContent, Box } from "@material-ui/core";
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
    } else {
      console.log(props.appointmentID);
      console.log(props.status);
      console.log("cant update, slot already assigned");
    }
  }
  return (
    <Box sx={{ width: "20vw" }}>
      <Card style={{ color: "#EEEEEE", backgroundColor: "#393E46" }}>
        <CardContent>
          <h1
            style={{
              color: "#EEEEEE",
              fontSize: ".8vw",
            }}
          >
            Starts at: {format(props.startTime, "hh:mm")}
            <br /> Ends at: {format(props.endTime, "hh:mm")}
          </h1>
        </CardContent>
        <CardActions>
          <Button style={{ color: "#393E46", backgroundColor: "#EEEEEE" }} variant="contained" onClick={handleClick}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default AppointmentCard;
