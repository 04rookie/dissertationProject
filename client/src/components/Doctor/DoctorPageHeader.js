import React from "react";
import { Box, Avatar, Fab } from "@material-ui/core";
import styles from "./DoctorContainer.module.css";
import EditIcon from "@material-ui/icons/Edit";
import { Link, useHistory } from "react-router-dom";
import { join } from "path";
import EditSlot from "./EditSlot";
function DoctorPageHeader(props) {
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
        Doctor ID: {props.doctorID}
      </h1>
      <h1
        style={{
          color: "#222831",
          fontSize: "1vw",
          fontFamily: "Montserrat",
          marginTop: "2vw"
        }}
      >
        Name: {props.doctorName}
      </h1>
      <h1
        style={{
          color: "#222831",
          fontSize: "1vw",
          fontFamily: "Montserrat",
        }}
      >
        Email: {props.doctorEmail}
      </h1>
      <Link
        to={"/edit-slot/" + props.doctorID}
        style={{ textDecoration: "none" }}
      >
        <Fab
          className={styles.DoctorHeaderFAB}
          color="primary"
          aria-label="edit"
        >
          {" "}
          <EditIcon />
        </Fab>
      </Link>
    </Box>
  );
}

export default DoctorPageHeader;
