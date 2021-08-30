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
import { matchPath, useLocation } from "react-router-dom";

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
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState({
    startTime: new Date(),
    endTime: new Date(),
    days: [[], [], [], [], [], [], []],
  });

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
    setData((prev) => {
      const appointmentID = makeid(3);
      const temp = { ...prev };
      temp.days[value].push({
        key: appointmentID,
        startTime: data.startTime,
        endTime: data.endTime,
        appointmentID: appointmentID,
      });
      return temp;
    });
  }

  async function handleSaveChanges() {
    try {
      const match = matchPath(location.pathname, {
        path: "/edit-slot/:doctorID",
        exact: true,
        strict: false,
      });
      const response = await axios.post(
        "/edit-slot/" + match.params.doctorID,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
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
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
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
        <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
          <Stack spacing={3}>
            <DesktopTimePicker
              label="Start time"
              value={data.startTime}
              onChange={(newValue) => {
                setData((prev) => {
                  let temp = { ...prev };
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
            <Button variant="outlined" onClick={handleClick}>
              Add slot
            </Button>
            <Button variant="outlined" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}

export default EditSlot;
