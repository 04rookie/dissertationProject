import axios from "axios";
import React, { useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router";
import defaultAvatar from "../../images/chillies.png";
import DoctorPageHeader from "./DoctorPageHeader";
import DoctorInfo from "./DoctorInfo";
import { Link, Route, Switch } from "react-router-dom";
import EditSlot from "./EditSlot";
import { Stack, Box } from "@material-ui/core";
import AppointmentCardDoctorPage from "./AppointmentCardDoctorPage";
import AuthHeader from "../Auth/Auth";
import { useHistory } from "react-router";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
function DoctorPage(props) {
  const history = useHistory();
  const location = useLocation();
  const [doctorName, setDoctorName] = useState();
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
      console.log(response);
      if (response.data.message === "noAccessRedirectToHome") {
        history.push({ pathname: "/home" });
      }
      setDoctorName(response.data.doctorName);
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
    <div>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={navbarValue}
          onChange={handleNavbarChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Profile" onClick={handleNavbarProfile} />
          <LinkTab label="Market" onClick={handleNavbarMarket} />
          <LinkTab label="Logout" onClick={handleLogout} />
        </Tabs>
      </Box>
      <DoctorPageHeader
        doctorID={getParamDoctorID()}
        doctorName={doctorName}
        defaultAvatar={defaultAvatar}
      />
      <DoctorInfo />
      <Stack>
        {appointment.map((subs) => {
          return <AppointmentCardDoctorPage key={makeid(20)} subs={subs} />;
        })}
      </Stack>
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
