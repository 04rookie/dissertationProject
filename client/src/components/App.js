import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginApp from "./Login/LoginApp"
import UserPageContainer from "./UserPage/UserPageContainer";
import VideoChatRoom from "./VideoChatRoom/VideoChatRoom";
import RegisterApp from "./Login/RegisterApp";
import Market from "./Market/Market";
import Appointment from "./Appointment/Appointment";
import DoctorRegistration from "./Doctor/DoctorRegistration";
import DoctorPage from "./Doctor/DoctorPage";
function App(){

    // const [appState, setAppState] = useState(<LoginApp callHandleLoginFromApp={callHandleLoginFromApp}
    //     callHandleRegisterFromApp={callHandleRegisterFromApp}
    // />);

    // function callHandleLoginFromApp(credentials){
    //     postServerLogin(credentials);
    // }

    // function callHandleRegisterFromApp(credentials){
    //     console.log("inside call handle reg from app and calling postserver")
    //     postServerRegister(credentials);
    // }

    // async function postServerLogin(credentials){
    //     try{
    //         const response = await axios.post("/Login", credentials,  {
    //             headers: {
    //               'Content-Type': 'application/json'
    //             }
    //           });
    //         console.log(response);
    //         if(response.data.loginStatus===true){
    //             setAppState(<UserPageContainer userData = {response.data} callVideoChatRoom={callVideoChatRoom}/>);
    //         }
            
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
    // }

    // async function postServerRegister(credentials){
    //     try{
    //         const response = await axios.post("/Register", credentials, 
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         console.log(response);
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
    // }

    // function callVideoChatRoom(){
    //     setAppState(<VideoChatRoom callCreateRoomFromApp={callCreateRoomFromApp} callPushRoomNameFromApp={callPushRoomNameFromApp} getRoomNameFromApp={getRoomNameFromApp}/>);
    // }

    // async function callCreateRoomFromApp(){
    //     console.log("Inside callCreateRoomFromApp in APP.js");
    //     return await postCreateRoom();
    // }

    // async function postCreateRoom(){
    //     try{
    //         console.log("Inside postCreateRoom APP.js");
    //         const credentials = {data:"decoywhosendsthistoserver"}
    //         const response = await axios.post("/CreateRoom", credentials,
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         //console.log(response.data);
    //         return response.data;
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
    // }

    // function callPushRoomNameFromApp(roomName){
    //     postRoomName(roomName);
    // }

    // async function postRoomName(roomName){
    //     try{
    //         //console.log("Inside postCreateRoom APP.js");
    //         const response = await axios.post("/PushRoomName", roomName,
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         console.log(response);
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
    // }

    return (<>
        <Switch>
            <Route exact path="/" render={(props=>(<LoginApp {...props} />))}></Route>
            <Route exact path="/user-page/:userID" render={(props)=>(<UserPageContainer {...props}/>)}></Route>
            <Route exact path="/register" render={(props)=>(<RegisterApp {...props} />)}/>
            <Route exact path="/video-chat-room" render={(props)=>(<VideoChatRoom {...props}/>)}></Route>
            <Route exact path="/market" render={(props)=>(<Market/>)}/>
            <Route exact path="/appointment" render={(props)=>(<Appointment/>)}/>
            <Route exact path="/doctor/registration" render={(props)=>(<DoctorRegistration/>)}/>
            <Route exact path="/doctor/:doctorID" render={(props)=>(<DoctorPage {...props}/>)}/>
            
        </Switch>
    </>)
}


export default App;