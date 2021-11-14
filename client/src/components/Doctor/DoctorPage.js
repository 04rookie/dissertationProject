import axios from "axios";
import React, { useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router";
import defaultAvatar from "../../images/chillies.png";
import DoctorPageHeader from "./DoctorPageHeader";
import DoctorInfo from "./DoctorInfo";
import { Link, Route, Switch } from "react-router-dom";
import EditSlot from "./EditSlot";
import { Stack, Box, Grid } from "@material-ui/core";
import AppointmentCardDoctorPage from "./AppointmentCardDoctorPage";
import AuthHeader from "../Auth/Auth";
import { useHistory } from "react-router";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
function DoctorPage(props) {
  const history = useHistory();
  const location = useLocation();
  const [doctorData, setDoctorData] = useState();
  const [doctorName, setDoctorName] = useState();
  const [doctorEmail, setDoctorEmail] = useState();
  const [appointment, setAppointment] = useState([]);
  function getParamDoctorID() {
    const match = matchPath(location.pathname, {
      path: "/doctor/:doctorID",
      exact: true,
      strict: false,
    });
    return match.params.doctorID;
  }

  useEffect(() => {
    const match = matchPath(location.pathname, {
      path: "/doctor/:doctorID",
      exact: true,
      strict: false,
    });
    getServerDoctor(match.params.doctorID);
  }, []);

  function makeid(length) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async function getServerDoctor(doctorID) {
    try {
      const response = await axios.get("/api/doctor/" + doctorID, {
        headers: AuthHeader(),
      });
      console.log(response.data.doctorName);
      console.log("-----")
      if (response.data.message === "noAccessRedirectToHome") {
        history.push({ pathname: "/home" });
      }
      setDoctorData((prev)=>{
        return {...response.data}
      })
      setDoctorName(response.data.doctorFirstName + " " + response.data.doctorLastName);
      setDoctorEmail(response.data.doctorEmail)
      setAppointment(response.data.appointment);
    } catch (error) {
      console.log(error);
    }
  }

  const [navbarValue, setNavbarValue] = React.useState(0);

  const handleNavbarChange = (event, newValue) => {
    setNavbarValue(newValue);
  };

  function handleLogout() {
    localStorage.removeItem("userID");
    history.push({ pathname: "/home" });
  }

  function handleNavbarMarket() {
    history.push({ pathname: "/market" });
  }

  function handleNavbarProfile() {
    history.push({ pathname: "doctor/" + getParamDoctorID() });
  }

  return (
    <div
      style={{
        height: "100vh",
        color: "#EEEEEE",
        backgroundColor: "#222831",
        overflowX:"hidden"
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={navbarValue}
          onChange={handleNavbarChange}
          aria-label="nav tabs example"
          textColor="#EEEEEE"
          indicatorColor="#EEEEEE"
          style={{paddingLeft:"5vw"}}
        >
          <LinkTab label="Profile" onClick={handleNavbarProfile} />
          <LinkTab label="Market" onClick={handleNavbarMarket} />
          <LinkTab label="Logout" onClick={handleLogout} />
        </Tabs>
      </Box>
      <DoctorPageHeader
        doctorID={getParamDoctorID()}
        doctorName={doctorName}
        doctorEmail={doctorEmail}
        defaultAvatar={defaultAvatar}
        doctorData={doctorData}
      />
      <Grid container spacing={3} columns={3} sx={{ margin: "0vw" }}>
        {appointment.map((subs) => {
          if(subs.appointmentID!==null){ 
            return <AppointmentCardDoctorPage key={makeid(20)} subs={subs} />;
          }
          else{
            return <span></span>
          }
        })}
      </Grid>
    </div>
  );
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default DoctorPage;
