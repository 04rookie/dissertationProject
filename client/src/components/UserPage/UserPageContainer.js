import React, {useEffect, useState} from "react";
import VideoChatRoom from "../VideoChatRoom/VideoChatRoom";


function UserPageContainer(props){
    function handleClick(event){
        props.callVideoChatRoom();
        event.preventDefault();
    }
    return <div> Hello {props.userData.userFirstName}
    <form>
    <button type="submit" name="Call" onClick={handleClick}>Call</button>
    </form>
    </div>;
}

export default UserPageContainer;