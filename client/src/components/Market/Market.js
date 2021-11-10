import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Stack, Grid } from "@material-ui/core";
import axios from "axios";
import MarketDoctorCard from "./MarketDoctorCard";
import ReviewCard from "./ReviewCard";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@material-ui/core";
import CurrentUserId from "../Context/CurrentUserId";
import CurrentDoctorId from "../Context/CurrentDoctorId";
import { useContext } from "react";
function Market(props) {
  const [doctorID, setDoctorID] = useState("");
  let history = useHistory();
  const [skipValue, setSkipValue] = useState(0);
  const limitValue = 10;
  const [marketData, setMarketData] = useState([]);
  const [review, setReview] = useState([]);
  const userIDContext = useContext(CurrentUserId);
  const doctorIDContext = useContext(CurrentDoctorId);
  useEffect(() => {
    //getServerDoctor();
    getServerDoctor().then((dataValues) => {
      setMarketData((prev) => {
        return [...prev, ...dataValues.data];
      });
    });
  }, [skipValue]);

  async function getServerDoctor() {
    try {
      const response = await axios.get("/api/doctor", {
        params: { skipValue: skipValue },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  function handleChange(e) {
    setDoctorID(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();

    const loadAppointment = () =>
      history.push({ pathname: "/appointment" + doctorID });
  }

  function handleClickReviews(doctorID) {
    getReviews(doctorID);
  }

  async function getReviews(doctorID) {
    const response = await axios.get("/api/review/" + doctorID);
    setReview(response.data);
  }

  // generates random string of given length
  function makeid(length) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const [navbarValue, setNavbarValue] = React.useState(1);

  const handleNavbarChange = (event, newValue) => {
    setNavbarValue(newValue);
  };

  function handleLogout() {
    localStorage.removeItem("userID");
    history.push({ pathname: "/home" });
  }

  function handleNavbarMarket() {
    history.push({ pathname: "/market" });
  }

  function handleNavbarProfile() {
    console.log("handleNavBarProfile");
    console.log(typeof userID);
    console.log(userIDContext);
    if (typeof userIDContext === "undefined") {
      history.push({ pathname: "/doctor/" + doctorIDContext });
    } else {
      history.push({ pathname: "/user-page/" + userIDContext });
    }
  }

  return (
    <div style={{ height: "100vh", color: "#EEEEEE", backgroundColor: "#393E46"}}>
      <Box sx={{ width: "100%", backgroundColor:"#222831", color:"#EEEEEE" }}>
        <Tabs
          value={navbarValue}
          onChange={handleNavbarChange}
          aria-label="nav tabs example"
          textColor="#EEEEEE"
          indicatorColor="#EEEEEE"
          backgroundColor="#EEEEEE"
        >
          <LinkTab label="Profile" onClick={handleNavbarProfile} />
          <LinkTab label="Market" onClick={handleNavbarMarket} />
          <LinkTab label="Logout" onClick={handleLogout} />
        </Tabs>
      </Box>
      <div style={{ display: "block", padding:"5vw" , backgroundColor:"#393E46"}}>
        <Grid container justify="center" spacing={6}>
          <Grid item align="center" xs={6}>
            <Grid container justify="center" spacing={7}>
              {marketData.map((cardData) => {
                return (
                  <MarketDoctorCard
                    key={cardData.doctorID}
                    doctorID={cardData.doctorID}
                    doctorName={cardData.doctorFirstName + " " + cardData.doctorLastName}
                    doctorRate={cardData.doctorRate}
                    handleClickReviews={handleClickReviews}
                  />
                );
              })}
            </Grid>
          </Grid>
          <Grid item align="center" xs={6}>
            {review.map((data) => {
              return <ReviewCard key={makeid(5)} data={data} />;
            })}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default Market;
