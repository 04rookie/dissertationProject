import React, { useContext, useState } from "react";
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
import Booking from "./Booking/Booking";
import CurrentUserId from "./Context/CurrentUserId";
import CurrentDoctorId from "./Context/CurrentDoctorId";
import Room from "./VideoChatRoom/Room";
import Home from "./Home/Home";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useHistory } from "react-router";
//handles the Route requests of the page.
function App() {
  const [loginContext, setLoginContext] = React.useState(null);
  const [doctorIDContext, setDoctorIDContext] = useState(null);
  const history = useHistory();
  const userID = useContext(CurrentUserId);
  const doctorID = useContext(CurrentDoctorId);
  return (
    <>
      <CurrentUserId.Provider value={loginContext}>
        <CurrentDoctorId.Provider value={doctorIDContext}>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <LoginApp
                  {...props}
                  setLoginContext={setLoginContext}
                  setDoctorIDContext={setDoctorIDContext}
                />
              )}
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
            <Route
              exact
              path="/appointment"
              render={(props) => <Appointment />}
            />
            <Route
              exact
              path="/admin/doctor/registration"
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
              path="/booking/:doctorID"
              render={(props) => <Booking />}
            />
            <Route exact path="/room" render={(props) => <Room />} />
            <Route
              exact
              path="/doctor/:doctorID/appointment/:appointmentID/room/:roomID"
              render={(props) => <Room {...props} />}
            />
            <Route exact path="/home" render={(props) => <Home {...props} />} />
          </Switch>
        </CurrentDoctorId.Provider>
      </CurrentUserId.Provider>
    </>
  );
}

export default App;
