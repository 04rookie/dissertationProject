import React from "react";
import { Box, Avatar, Fab } from "@material-ui/core";
import styles from "./DoctorContainer.module.css";
import EditIcon from '@material-ui/icons/Edit';
function DoctorPageHeader(props){
    return (<Box className={styles.DoctorHeader}>
    <Avatar className={styles.DoctorHeaderAvatar} sx={{width:"17vh", height:"17vh"}} alt="Remy Sharp" src={props.defaultAvatar} />
    <h3 className={styles.DoctorHeaderText}>{props.doctorName}</h3>
    <Fab className={styles.DoctorHeaderFAB} color="primary" aria-label="edit"> <EditIcon/></Fab>
</Box>)
}

export default DoctorPageHeader;