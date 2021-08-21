import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import VideoChatRoom from "../VideoChatRoom/VideoChatRoom";
import { Link } from "react-router-dom";

function UserPageContainer(props){
    return <div> Hello {props.userData.userFirstName}
    <form>
    <Link to="/video-chat-room" style={{ textDecoration: 'none' }}><button type="submit" name="Call">Call</button></Link>
    </form>
    </div>;
}

export default UserPageContainer;