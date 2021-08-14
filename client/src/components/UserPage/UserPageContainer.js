import React, {useEffect, useState} from "react";

function UserPageContainer(props){
    return <div> Hello {props.userData.userFirstName}</div>;
}

export default UserPageContainer;