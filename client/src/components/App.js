import React, { useEffect, useState } from "react";
import IntroContainer from "./Login/IntroContainer";
import LoginApp from "./Login/LoginApp"
import UserPageContainer from "./UserPage/UserPageContainer";
import VideoChatRoom from "./VideoChatRoom/VideoChatRoom";
const axios = require("axios");

function App(){

    const [appState, setAppState] = useState(<LoginApp callHandleLoginFromApp={callHandleLoginFromApp}
        callHandleRegisterFromApp={callHandleRegisterFromApp}
    />);

    function callHandleLoginFromApp(credentials){
        postServerLogin(credentials);
    }

    function callHandleRegisterFromApp(credentials){
        console.log("inside call handle reg from app and calling postserver")
        postServerRegister(credentials);
    }

    async function postServerLogin(credentials){
        try{
            const response = await axios.post("/Login", credentials,  {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            console.log(response);
            if(response.data.loginStatus===true){
                setAppState(<UserPageContainer userData = {response.data} callVideoChatRoom={callVideoChatRoom}/>);
            }
            
        }
        catch(error){
            console.log(error);
        }
    }

    async function postServerRegister(credentials){
        try{
            const response = await axios.post("/Register", credentials, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
        }
        catch(error){
            console.log(error);
        }
    }

    function callVideoChatRoom(){
        setAppState(<VideoChatRoom callCreateRoomFromApp={callCreateRoomFromApp} callPushRoomNameFromApp={callPushRoomNameFromApp} getRoomNameFromApp={getRoomNameFromApp}/>);
    }

    async function callCreateRoomFromApp(){
        console.log("Inside callCreateRoomFromApp in APP.js");
        return await postCreateRoom();
    }

    async function postCreateRoom(){
        try{
            console.log("Inside postCreateRoom APP.js");
            const credentials = {data:"decoywhosendsthistoserver"}
            const response = await axios.post("/CreateRoom", credentials,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            //console.log(response.data);
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }

    function callPushRoomNameFromApp(roomName){
        postRoomName(roomName);
    }

    async function postRoomName(roomName){
        try{
            //console.log("Inside postCreateRoom APP.js");
            const response = await axios.post("/PushRoomName", roomName,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
        }
        catch(error){
            console.log(error);
        }
    }

    async function getRoomNameFromApp(){
        return await getRoomName();
    }

    async function getRoomName(){
        try{
            //console.log("Inside postCreateRoom APP.js");
            const response = await axios.post("/RoomName");
            console.log(response);
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }
    return <div>{appState}</div>
}


export default App;