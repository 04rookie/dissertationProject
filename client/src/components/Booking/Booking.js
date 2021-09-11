import axios from "axios";
import React, { useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Stack, Box } from "@mui/material";
import AppointmentCard from "./AppointmentCard";
import { Button } from "@material-ui/core";
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

function Booking() {
  let location = useLocation();
  useEffect(() => {
    getServerDoctorAppointment();
  }, []);

  const match = matchPath(location.pathname, {
    path: "/booking/:doctorID",
    exact: true,
    strict: false,
  });
  const doctorID = match.params.doctorID;

  async function getServerDoctorAppointment() {
    const response = await axios.get("/api/booking/" + doctorID);
    console.log(response);
    response.data.appointment.map((cardData) => {
      setData((prev) => {
        prev[cardData.day].push(cardData);
        return [...prev];
      });
    });
  }

  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([[], [], [], [], [], [], []]);
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

  function handleClickProceed(){
    const response = postServerAppointment();
  }

  async function postServerAppointment() {
    try {
      const response = axios.post(
        "/api/booking/" + doctorID,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Stack spacing={3}>
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
                  key={makeid(20)}
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
                key={makeid(20)}
                value={item.tabIndex}
                index={item.tabIndex}
                dir={theme.direction}
              >
                <Stack component={"span"} spacing={3}>
                  {data[value].map((cardData) => {
                    return (
                      <AppointmentCard
                        key={makeid(20)}
                        doctorID={doctorID}
                        appointmentData={cardData}
                        setData={setData}
                      />
                    );
                  })}
                </Stack>
              </TabPanel>
            );
          })}
        </SwipeableViews>
      </Box>
      <Button variant="outlined" onClick={handleClickProceed}>
        Proceed
      </Button>
    </Stack>
  );
}

export default Booking;
