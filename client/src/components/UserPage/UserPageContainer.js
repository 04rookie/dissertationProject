import React, { useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import {Avatar, Box, Fab, Stack} from "@material-ui/core"
import defaultAvatar from "../../images/chillies.png";
import styles from "./UserPageContainer.module.css";
import EditIcon from '@material-ui/icons/Edit';
import UserPageHeader from "./UserPageHeader";
import UserPageInfo from "./UserPageInfo";
function UserPageContainer(){
    const location = useLocation();
    const [userFirstName, setUserFirstName] = useState();
    useEffect(()=>{
        const match = matchPath(location.pathname, {path: '/user-page/:userID', exact:true, strict:false});
        getServerUser(match.params.userID);
    }, []);

    async function getServerUser(userID){
        try{
            const response = await axios.get("/api/user/" + userID);
            console.log(response);
            setUserFirstName(response.data.userFirstName);
        }
        catch(error){
            console.log(error);
        }
    }

    console.log(location);
    return <div>
    <UserPageHeader userFirstName={userFirstName} defaultAvatar={defaultAvatar}/>
    <UserPageInfo/>
    <form>
    <Link to="/video-chat-room" style={{ textDecoration: 'none' }}><button type="submit" name="Call">Call</button></Link>
    <Link to="/market" style={{textDecoration: "none"}}><button type="submit" name="Market">Market</button></Link>
    <Link to="/lobby" style={{textDecoration: "none"}}><button type="submit" name="lobby">lobby</button></Link>
    </form>
    </div>;
}

export default UserPageContainer;