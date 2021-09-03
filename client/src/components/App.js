import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginApp from "./Login/LoginApp";
import UserPageContainer from "./UserPage/UserPageContainer";
import VideoChatRoom from "./VideoChatRoom/VideoChatRoom";
import RegisterApp from "./Login/RegisterApp";
import Market from "./Market/Market";
import Appointment from "./Appointment/Appointment";
import DoctorRegistration from "./Doctor/DoctorRegistration";
import DoctorPage from "./Doctor/DoctorPage";
import EditSlot from "./Doctor/EditSlot";
import Lobby from "./VideoChatRoom/Lobby";
//handles the Route requests of the page.
function App() {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <LoginApp {...props} />}
        ></Route>
        <Route
          exact
          path="/user-page/:userID"
          render={(props) => <UserPageContainer {...props} />}
        ></Route>
        <Route
          exact
          path="/register"
          render={(props) => <RegisterApp {...props} />}
        />
        <Route
          exact
          path="/video-chat-room"
          render={(props) => <VideoChatRoom {...props} />}
        ></Route>
        <Route exact path="/market" render={(props) => <Market />} />
        <Route exact path="/appointment" render={(props) => <Appointment />} />
        <Route
          exact
          path="/doctor/registration"
          render={(props) => <DoctorRegistration />}
        />
        <Route
          exact
          path="/doctor/:doctorID"
          render={(props) => <DoctorPage {...props} />}
        />
        <Route
          exact
          path="/edit-slot/:doctorID"
          render={(props) => <EditSlot />}
        />
        <Route
          exact
          path="/lobby"
          render={(props)=><Lobby/>}/>
      </Switch>
    </>
  );
}

export default App;
