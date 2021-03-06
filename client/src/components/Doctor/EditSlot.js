import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Stack,
} from "@material-ui/core";
import DesktopTimePicker from "@material-ui/lab/DesktopTimePicker";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AppointmentCard from "./AppointmentCard";
import axios from "axios";
import { matchPath, useLocation, useHistory } from "react-router-dom";
import format from "date-fns/format";
import { intervalToDuration, isAfter, isBefore, isEqual } from "date-fns";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function EditSlot(props) {
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const history = useHistory();
    const [value, setValue] = React.useState(0);
  const [data, setData] = useState({
    startTime: new Date(),
    endTime: new Date(),
    days: [[], [], [], [], [], [], []],
  });

  useEffect(() => {
    getEditSlots().then((data) => {
      let daysData = [[], [], [], [], [], [], []];
      for (let i = 0; i < data.length; i++) {
        data[i].startTime = new Date("01/01/1970 " + data[i].startTime);
        data[i].endTime = new Date("01/01/1970 " + data[i].endTime);
        daysData[data[i].day].push(data[i]);
      }
      console.log(daysData);
      setData((prev) => {
        return { ...prev, days: daysData };
      });
    });
  }, []);

  async function getEditSlots() {
    try {
      const match = matchPath(location.pathname, {
        path: "/edit-slot/:doctorID",
        exact: true,
        strict: false,
      });
      const response = await axios.get(
        "/api/edit-slot/" + match.params.doctorID
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const tabData = [
    { label: "Sunday", tabIndex: 0 },
    { label: "Monday", tabIndex: 1 },
    { label: "Tuesday", tabIndex: 2 },
    { label: "Wednesday", tabIndex: 3 },
    { label: "Thursday", tabIndex: 4 },
    { label: "Friday", tabIndex: 5 },
    { label: "Saturday", tabIndex: 6 },
  ];

  function makeid(length) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function handleClick(event) {
    const success = validationOfDuration();
    if (!success) {
      return false;
    }
    setData((prev) => {
      const appointmentID = makeid(20);
      const temp = { ...prev };
      const match = matchPath(location.pathname, {
        path: "/edit-slot/:doctorID",
        exact: true,
        strict: false,
      });
      temp.days[value].push({
        key: appointmentID,
        startTime: data.startTime,
        endTime: data.endTime,
        appointmentID: null,
        doctorID: match.params.doctorID,
        day: value,
        status: "open",
        userID: null,
        roomID: null,
      });
      return temp;
    });
  }

  function validationOfDuration() {
    if (
      isAfter(data.startTime, data.endTime) ||
      isEqual(data.startTime, data.endTime)
    ) {
      setErrorMessage(
        "Failed to register, ensure that start time is before end time."
      );
      return false;
    }
    console.log(
      intervalToDuration({ start: data.startTime, end: data.endTime }).hours
    );
    if (
      intervalToDuration({ start: data.startTime, end: data.endTime }).hours > 4
    ) {
      setErrorMessage("Failed to register, max duration allowed is 4 hours.");
      return false;
    }
    for (let counter = 0; counter < data.days[value].length; counter++) {
      if (
        !(
          isBefore(data.endTime, data.days[value][counter].startTime) ||
          isAfter(data.startTime, data.days[value][counter].endTime)
        )
      ) {
        setErrorMessage(
          "Failed to register, ensure that new slot you make does not collide with other ones you have created"
        );
        return false;
      }
    }
    setErrorMessage("")
    return true;
  }

  async function handleSaveChanges() {
    try {
      const match = matchPath(location.pathname, {
        path: "/edit-slot/:doctorID",
        exact: true,
        strict: false,
      });
      let request = [[], [], [], [], [], [], []];
      for (let outer = 0; outer < data.days.length; outer++) {
        for (let inner = 0; inner < data.days[outer].length; inner++) {
          let startTimeString = format(
            data.days[outer][inner].startTime,
            "hh:mm"
          );
          let endTimeString = format(data.days[outer][inner].endTime, "hh:mm");
          request[outer].push({
            startTime: startTimeString,
            endTime: endTimeString,
            doctorID: match.params.doctorID,
            appointmentID: data.days[outer][inner].appointmentID,
            day: data.days[outer][inner].day,
            status: data.days[outer][inner].status,
            userID: data.days[outer][inner].userID,
            roomID: data.days[outer][inner].roomID,
          });
        }
      }
      // console.log(request);
      const response = await axios.post(
        "/api/edit-slot/" + match.params.doctorID,
        request,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      history.push({pathname:"/doctor/" + match.params.doctorID});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{color: "#393e46", backgroundColor: "#EEEEEE"}}>
    <Grid style={{backgroundColor:"#EEEEEE", height:"100%" }} container spacing={2}>
      <Grid item xs={8}>
        <Box sx={{ bgcolor: "background.paper", width: "100%"}}>
          <AppBar position="static">
            <div style={{color: "#EEEEEE", backgroundColor: "#393E46"}}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="#00ADB5"
                backgroundColor="#222831"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                {tabData.map((item) => {
                  return (
                    <Tab
                      key={item.tabIndex}
                      label={item.label}
                      {...a11yProps(item.tabIndex)}
                    />
                  );
                })}
              </Tabs>
            </div>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
            style={{color: "#393e46", backgroundColor: "#EEEEEE"}}
          >
            {tabData.map((item) => {
              return (
                <TabPanel
                  key={item.tabIndex}
                  value={item.tabIndex}
                  index={item.tabIndex}
                  dir={theme.direction}
                >
                  <Stack component={"span"} spacing={3}>
                    {data.days[value].map((cardData) => {
                      return (
                        <AppointmentCard
                          key={cardData.key}
                          startTime={cardData.startTime}
                          endTime={cardData.endTime}
                          setData={setData}
                          value={value}
                          appointmentID={cardData.appointmentID}
                          status={cardData.status}
                        />
                      );
                    })}
                  </Stack>
                </TabPanel>
              );
            })}
          </SwipeableViews>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box
          sx={{ bgcolor: "background.paper", width: "100%", padding: "3vw", paddingTop:"20vw", minHeight:"100vh"}}
        >
          <Stack spacing={3}>
            <DesktopTimePicker
              label="Start time"
              value={data.startTime}
              onChange={(newValue) => {
                setData((prev) => {
                  let temp = { ...prev };
                  //let newValueAsString = format(newValue, 'hh:mm');
                  temp.startTime = newValue;
                  return temp;
                });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DesktopTimePicker
              label="End time"
              value={data.endTime}
              onChange={(newValue) => {
                setData((prev) => {
                  let temp = { ...prev };
                  temp.endTime = newValue;
                  return temp;
                });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <Button
              style={{
                width: "10vw",
                margin: "auto",
                marginBottom: "1vw",
                marginTop: "1vw",
                color: "#EEEEEE", backgroundColor: "#393E46"
              }}
              variant="contained"
              onClick={handleClick}
            >
              Add slot
            </Button>
            <Button
              style={{
                width: "10vw",
                margin: "auto",
                color: "#EEEEEE", backgroundColor: "#393E46"
              }}
              variant="contained"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
            <div style={{marginLeft:"auto", marginRight:"auto"}}>
              <p>{errorMessage}</p>
            </div>
          </Stack>
        </Box>
      </Grid>
    </Grid>
    </div>
  );
}

export default EditSlot;
