import React, { useState } from "react";
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
  const [value, setValue] = React.useState(0);
  const [sunday, setSunday] = useState([]);
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
      const temp = { ...prev };
      temp.days[value].push({
        key: makeid(3),
        startTime: data.startTime,
        endTime: data.endTime,
      });
      return temp;
    });
    console.log(data);
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
                  value={value}
                  index={item.tabIndex}
                  dir={theme.direction}
                >
                  {console.log(item.tabIndex)}
                  <Stack spacing={3}>
                    {data.days[item.tabIndex].map((cardData) => {
                      return (
                        <AppointmentCard
                          key={cardData.key}
                          startTime={cardData.startTime}
                          endTime={cardData.endTime}
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
                setData(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DesktopTimePicker
              label="End time"
              value={data.endTime}
              onChange={(newValue) => {
                setData(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <Button variant="outlined" onClick={handleClick}>
              Add slot
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}

export default EditSlot;
