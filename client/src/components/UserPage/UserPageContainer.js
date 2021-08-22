import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function UserPageContainer(){
    const location = useLocation();
    console.log(location);
    return <div> Hello wait {location.state.data.userFirstName}
    <form>
    <Link to="/video-chat-room" style={{ textDecoration: 'none' }}><button type="submit" name="Call">Call</button></Link>
    </form>
    </div>;
}

export default UserPageContainer;