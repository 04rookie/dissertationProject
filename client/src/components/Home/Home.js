import React from "react";
import { Box, Stack, Grid } from "@material-ui/core";
import tree from "./tree.png";
import biz from "./bizinsider.png";
import mashable from "./mashable.png";
import techcrunch from "./techcrunch.png";
import tnw from "./tnw.png";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import bev from "./bev.jpg";
import dad from "./dad.jpg";
import man from "./man.jpg";
function Home() {
  const history = useHistory();
  function handleRegister() {
    history.push({ pathname: "/register" });
  }

  function handleLogin() {
    history.push({ pathname: "/login" });
  }
  const featuresData = [
    {
      icon: "fas fa-user-shield",
      iconStyle: { color: "#EEEEEE", fontSize: "3.5rem" },
      title: "Privacy",
      titleStyle: {
        color: "#EEEEEE",
        marginTop: "1vw",
        fontSize: "1.5vw",
        fontFamily: "Montserrat",
        display: "block",
      },
      content: "Doctors dont share any data with us.",
      contentStyle: {
        color: "#EEEEEE",
        marginTop: "1vw",
        fontSize: "1vw",
        fontFamily: "Montserrat",
      },
    },
    {
      icon: "fas fa-search-dollar",
      iconStyle: { color: "#EEEEEE", fontSize: "3.5rem" },
      title: "Low costs",
      titleStyle: {
        color: "#EEEEEE",
        marginTop: "1vw",
        fontSize: "1.5vw",
        fontFamily: "Montserrat",
      },
      content: "Prices are driven by market, that means you!",
      contentStyle: {
        color: "#EEEEEE",
        marginTop: "1vw",
        fontSize: "1vw",
        fontFamily: "Montserrat",
      },
    },
    {
      icon: "fas fa-laptop-house",
      iconStyle: { color: "#EEEEEE", fontSize: "3.5rem" },
      title: "Remote",
      titleStyle: {
        color: "#EEEEEE",
        marginTop: "1vw",
        fontSize: "1.5vw",
        fontFamily: "Montserrat",
      },
      content: "Access it from anywhere.",
      contentStyle: {
        color: "#EEEEEE",
        marginTop: "1vw",
        fontSize: "1vw",
        fontFamily: "Montserrat",
      },
    },
  ];

  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const theme = useTheme();
  const testimonials = [
    {
      text: "It changed my life and the way I see things.",
      img: bev,
      name: "Beverly, Illinois.",
    },
    {
      text: "Helped my son to control his addiction.",
      img: dad,
      name: "Arthur, Chicago",
    },
    {
      text: "It helps everyone, no matter how severe or simple problems you have.",
      img: man,
      name: "Sandeep, Mumbai",
    },
  ];
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = testimonials.length;
  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  return (
    <div style={{ overflow: "hidden" }}>
      <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <Box
          sx={{
            width: "100%",
            padding: "5.8vw",
            backgroundColor: "#00ADB5",
          }}
        >
          <h1
            style={{
              color: "#222831",
              fontSize: "2.8vw",
              fontFamily: "Montserrat",
            }}
          >
            Instahelp.
          </h1>
          <h1
            style={{
              color: "#222831",
              marginTop: "11vw",
              fontSize: "2.2vw",
              fontFamily: "Montserrat",
            }}
          >
            Pick a specialist from <br />
            thousands of curated doctors.
          </h1>
          <Button
            variant="contained"
            onClick={handleRegister}
            style={{
              backgroundColor: "#222831",
              marginRight: "2vw",
              marginTop: "1vw",
            }}
          >
            Sign up
          </Button>
          <Button
            variant="contained"
            onClick={handleLogin}
            style={{ backgroundColor: "#222831", marginTop: "1vw" }}
          >
            Log in
          </Button>
          <img
            alt="tree"
            src={tree}
            style={{
              width: "28vw",
              position: "absolute",
              left: "60vw",
              // top: "13.7vw",
              bottom:"15vw",
              marginBottom:"0vw"
            }}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#222831",
            padding: "4.1vw",
          }}
        >
          <Stack
            direction="row"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {featuresData.map((feature) => {
              return <Features data={feature} />;
            })}
          </Stack>
        </Box>
      </div>
      <div name="reviews">
        <Box sx={{ padding: "8vw", backgroundColor: "#EEEEEE" }}>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            interval={5000}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {testimonials.map((step, index) => (
              <div key={step.label}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Stack justify="center">
                    <h1
                      align="center"
                      style={{
                        color: "#222831",
                        fontSize: "2.2vw",
                        fontFamily: "Montserrat",
                      }}
                    >
                      {step.text}
                    </h1>
                    <Avatar
                      sx={{
                        height: "8vw",
                        width: "8vw",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: "1.5vw",
                        marginTop: "1.5vw",
                      }}
                      alt={step.name}
                      src={step.img}
                    />
                    <h1
                      align="center"
                      style={{
                        marginBottom: "5vw",
                        color: "#222831",
                        fontSize: ".8vw",
                        fontFamily: "Montserrat",
                      }}
                    >
                      {step.name}
                    </h1>
                  </Stack>
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <Grid container justify="center" spacing={5}>
            <Grid item align="center" xs={3}>
              <img alt="biz" src={biz} style={{ width: "18vw" }} />
            </Grid>
            <Grid item align="center" xs={3}>
              <img alt="mashable" src={mashable} style={{ width: "18vw" }} />
            </Grid>
            <Grid item align="center" xs={3}>
              <img alt="tnw" src={tnw} style={{ width: "10vw" }} />
            </Grid>
            <Grid item align="center" xs={3}>
              <img
                alt="techcrunch"
                src={techcrunch}
                style={{ width: "18vw" }}
              />
            </Grid>
          </Grid>
        </Box>
      </div>
      <div name="footer">
        <Box
          sx={{ padding: "4vw", backgroundColor: "#222831"}}
        >
          <Grid container align="center">
            <Grid item xs={12}>
              <i
                style={{ color: "#EEEEEE", fontSize: "1.7vw", marginLeft:"1vw", marginRight:"1vw"}}
                class="fab fa-facebook-square"
              ></i>
              <i
                style={{ color: "#EEEEEE", fontSize: "1.7vw", marginLeft:"1vw", marginRight:"1vw" }}
                class="fab fa-reddit-square"
              ></i>
              <i
                style={{ color: "#EEEEEE", fontSize: "1.7vw", marginLeft:"1vw", marginRight:"1vw"}}
                class="fab fa-twitter-square"
              ></i>
              <i
                style={{ color: "#EEEEEE", fontSize: "1.7vw", marginLeft:"1vw", marginRight:"1vw" }}
                class="fab fa-youtube"
              ></i>
            </Grid>
          </Grid>
          <h1
            align="center"
            style={{
              marginTop: "2vw",
              color: "#EEEEEE",
              fontSize: ".6vw",
            }}
          >
          <i class="far fa-copyright"></i> Copyright 2020 instahelp
          </h1>
        </Box>
      </div>
    </div>
  );
}

function Features(props) {
  return (
    <div style={{ marginLeft: "5vw", marginRight: "5vw", textAlign: "center" }}>
      {console.log(props)}
      <i class={props.data.icon} style={props.data.iconStyle}></i>
      <h1 style={props.data.titleStyle}>{props.data.title}</h1>
      <h1 style={props.data.contentStyle}>{props.data.content}</h1>
    </div>
  );
}

export default Home;
