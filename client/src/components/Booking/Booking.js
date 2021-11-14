import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { matchPath, useHistory, useLocation } from "react-router";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Stack, Box, Grid } from "@mui/material";
import AppointmentCard from "./AppointmentCard";
//import { Button } from "@material-ui/core";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CurrentUserId from "../Context/CurrentUserId";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";

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
  const history = useHistory();
  let location = useLocation();
  const userID = useContext(CurrentUserId);
  useEffect(() => {
    getServerDoctorAppointment();
  }, []);

  const [doctorRate, setDoctorRate] = useState(0);

  const match = matchPath(location.pathname, {
    path: "/booking/:doctorID",
    exact: true,
    strict: false,
  });
  const doctorID = match.params.doctorID;

  async function getServerDoctorAppointment() {
    try {
      const response = await axios.get("/api/booking/" + doctorID);
      console.log(response);
      setDoctorRate(response.data.doctorRate);
      response.data.appointment.map((cardData) => {
        setData((prev) => {
          prev[cardData.day].push(cardData);
          return [...prev];
        });
      });
    } catch (error) {
      console.log(error);
    }
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

  function handleClickProceed() {
    setOpen(true);
  }

  function handleBilling() {}

  async function postServerAppointment() {
    try {
      const response = axios.patch(
        "/api/booking/" + doctorID,
        [sessionCount, data],
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

  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = useState("");

  const handleCancel = () => {
    setOpen(false);
    setSuccess("not booked billing unsuccessful");
  };

  const handlePay = () => {
    setOpen(false);
    setSuccess("Booked billing successful");
    // success === "Booked billing successful"
    //   ? postServerAppointment()
    //   : console.log("not booked billing unsuccessful");
    const response = postServerAppointment().then((res)=>history.push({pathname:"/user-page/" + userID}));
  };

  const [cardType, setCardType] = React.useState("Credit Card");

  const handleCardSelect = (event) => {
    setCardType(event.target.value);
  };

  const [sessionCount, setSessionCount] = useState(1);

  function handleSessionCountSlider(event) {
    setSessionCount(event.target.value);
  }

  return (
    <Stack spacing={3}>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Billing</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <b>
              To subscribe to this website, please enter your billing
              information here. We will send updates occasionally.
            </b>
          </DialogContentText>
          <div>Doctor rate per session: {doctorRate}</div>
          <div>Number of sessions: {sessionCount}</div>
          <Box width={300}>
            <Slider
              size="small"
              aria-label="Small"
              valueLabelDisplay="auto"
              min={1}
              max={25}
              value={sessionCount}
              onChange={handleSessionCountSlider}
              name="sessionSlider"
            />
          </Box>
          <div>Amount: {sessionCount * doctorRate}</div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select card type</FormLabel>
            <RadioGroup
              aria-label="Select card type"
              name="controlled-radio-buttons-group"
              value={cardType}
              onChange={handleCardSelect}
            >
              <FormControlLabel
                value="Credit card"
                control={<Radio />}
                label="Credit card"
              />
              <FormControlLabel
                value="Debit card"
                control={<Radio />}
                label="Debit card"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Card number"
            type="text"
            fullWidth
            variant="standard"
            name="cardNumber"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="CVV"
            type="text"
            fullWidth
            variant="standard"
            name="cvv"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="year"
            type="text"
            fullWidth
            variant="standard"
            name="year"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handlePay}>Pay</Button>
        </DialogActions>
      </Dialog>
      <div style={{ color: "#393e46", backgroundColor: "#EEEEEE", minHeight:"100vh" }}>
        <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
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
                      key={makeid(20)}
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
            style={{ color: "#393e46", backgroundColor: "#EEEEEE" }}
          >
            {tabData.map((item) => {
              return (
                <TabPanel
                  key={makeid(20)}
                  value={item.tabIndex}
                  index={item.tabIndex}
                  dir={theme.direction}
                >
                  <Grid container spacing={3}>
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
                  </Grid>
                </TabPanel>
              );
            })}
          </SwipeableViews>
        </Box>
        <div align="center">
        <Button style={{color: "#EEEEEE", backgroundColor: "#393E46"}} onClick={handleClickProceed}>
          Proceed
        </Button>
        </div>
      </div>
    </Stack>
  );
}

export default Booking;
