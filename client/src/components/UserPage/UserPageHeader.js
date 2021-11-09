import React from "react";
import { Box, Avatar, Fab } from "@material-ui/core";
function UserPageHeader(props) {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "2vw",
        backgroundColor: "#00ADB5",
      }}
    >
      <h1
        style={{
          color: "#222831",
          fontSize: ".6vw",
          fontFamily: "Montserrat",
        }}
      >
        User ID: {props.userData.userID}
      </h1>
      <h1
        style={{
          color: "#222831",
          fontSize: ".6vw",
          fontFamily: "Montserrat",
        }}
      >
        Member since: {props.userData.userJoinDate }
      </h1>
      <h1
        style={{
          color: "#222831",
          fontSize: "1vw",
          fontFamily: "Montserrat",
          marginTop: "2vw"
        }}
      >
        Name: {props.userData.userFirstName + " " + props.userData.userLastName}
      </h1>
      <h1
        style={{
          color: "#222831",
          fontSize: "1vw",
          fontFamily: "Montserrat",
        }}
      >
        User Email: {props.userData.userEmail}
      </h1>
      {console.log(props.userData)}
    </Box>
  );
}

export default UserPageHeader;
