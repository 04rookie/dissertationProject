import axios from "axios";
import React, { useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router";
import defaultAvatar from "../../images/chillies.png";
import DoctorPageHeader from "./DoctorPageHeader";
import DoctorInfo from "./DoctorInfo";
import { Link, Route, Switch } from "react-router-dom";
import EditSlot from "./EditSlot";
import { Stack } from "@material-ui/core";
import AppointmentCardDoctorPage from "./AppointmentCardDoctorPage";
function DoctorPage() {
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
      const response = await axios.get("/api/doctor/" + doctorID);
      console.log(response);
      setDoctorName(response.data.doctorName);
      setAppointment(response.data.appointment);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <DoctorPageHeader
        doctorID={getParamDoctorID()}
        doctorName={doctorName}
        defaultAvatar={defaultAvatar}
      />
      <DoctorInfo />
      <Stack>
        {
          appointment.map((subs) => {
          return <AppointmentCardDoctorPage key={makeid(20)} subs={subs}/>;
        })}
      </Stack>
    </div>
  );
}

export default DoctorPage;
