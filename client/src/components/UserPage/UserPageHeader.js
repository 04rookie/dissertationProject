import React from "react";
import { Box, Avatar, Fab } from "@material-ui/core";
import styles from "./UserPageContainer.module.css";
import EditIcon from '@material-ui/icons/Edit';
function UserPageHeader(props){
    return (<Box className={styles.userPageHeader}>
    <Avatar className={styles.userPageHeaderAvatar} sx={{width:"17vh", height:"17vh"}} alt="Remy Sharp" src={props.defaultAvatar} />
    <h3 className={styles.userPageHeaderText}>{props.userFirstName}</h3>
    <Fab className={styles.userPageHeaderFAB} color="primary" aria-label="edit"> <EditIcon/></Fab>
</Box>)
}

export default UserPageHeader;