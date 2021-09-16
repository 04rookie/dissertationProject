import React, { useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { Avatar, Box, Fab, Stack } from "@material-ui/core";
import defaultAvatar from "../../images/chillies.png";
import styles from "./UserPageContainer.module.css";
import EditIcon from "@material-ui/icons/Edit";
import UserPageHeader from "./UserPageHeader";
import UserPageInfo from "./UserPageInfo";
import AppointmentCard from "./AppointmentCard";
function UserPageContainer() {
  const location = useLocation();
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
      const response = await axios.get("/api/user/" + userID);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <UserPageHeader
        userFirstName={userData.userFirstName}
        defaultAvatar={defaultAvatar}
      />
      <UserPageInfo />
      <form>
        <Link to="/video-chat-room" style={{ textDecoration: "none" }}>
          <button type="submit" name="Call">
            Call
          </button>
        </Link>
        <Link to="/market" style={{ textDecoration: "none" }}>
          <button type="submit" name="Market">
            Market
          </button>
        </Link>
      </form>
      <Stack>
        {userSubscription.map((subs)=>{return <AppointmentCard subs={subs}/>})}
      </Stack>
    </div>
  );
}

export default UserPageContainer;
