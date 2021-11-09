import React, { useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { Avatar, Box, Fab, Stack, Grid } from "@material-ui/core";
import defaultAvatar from "../../images/chillies.png";
import styles from "./UserPageContainer.module.css";
import EditIcon from "@material-ui/icons/Edit";
import UserPageHeader from "./UserPageHeader";
import AppointmentCard from "./AppointmentCard";
import AuthHeader from "../Auth/Auth";
import { useHistory } from "react-router";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
function UserPageContainer(props) {
  const location = useLocation();
  const history = useHistory();
  const [userData, setUserData] = useState({
    loginStatus: null,
    userEmail: "",
    userFirstName: "",
    userLastName: "",
    userID: "",
    userJoinDate: "",
  });

  const [userSubscription, setUserSubscription] = useState([]);
  useEffect(() => {
    const match = matchPath(location.pathname, {
      path: "/user-page/:userID",
      exact: true,
      strict: false,
    });
    getServerUser(match.params.userID).then((data) => {
      setUserSubscription((prev) => {
        return [...prev, ...data.userSubscription];
      });
      setUserData((prev) => {
        return {
          loginStatus: data.loginStatus,
          userEmail: data.userEmail,
          userFirstName: data.userFirstName,
          userLastName: data.userLastName,
          userID: data.userID,
          userJoinDate: data.userJoinDate,
        };
      });
    });
  }, []);

  async function getServerUser(userID) {
    try {
      const response = await axios.get("/api/user/" + userID, {
        headers: AuthHeader(),
      });
      console.log(response.data);
      if (response.data.message === "noAccessRedirectToHome") {
        history.push({ pathname: "/home" });
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  function makeid(length) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
    history.push({ pathname: "/user-page/" + userData.userID });
  }

  return (
    <div
      style={{ height: "100vh", color: "#EEEEEE", backgroundColor: "#222831", overflow:"hidden" }}
    >
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={navbarValue}
          onChange={handleNavbarChange}
          aria-label="nav tabs example"
          textColor="#EEEEEE"
          indicatorColor="#EEEEEE"
        >
          <LinkTab label="Profile" onClick={handleNavbarProfile} />
          <LinkTab label="Market" onClick={handleNavbarMarket} />
          <LinkTab label="Logout" onClick={handleLogout} />
        </Tabs>
      </Box>
      <UserPageHeader userData={userData} />
      <Box sx={{ backgroundColor: "#222831" }}>
        <Grid container spacing={3} columns={3} sx={{ margin: "0vw" }}>
          {userSubscription.map((subs) => {
            return <AppointmentCard key={makeid(20)} subs={subs} />;
          })}
        </Grid>
      </Box>
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

export default UserPageContainer;
