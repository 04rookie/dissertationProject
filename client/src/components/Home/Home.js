import React from "react";
import { Box, Stack } from "@material-ui/core";
import tree from "./tree.png";
function Home() {
  const featuresData = [
    {
      icon: "fas fa-user-shield",
      iconStyle: { color: "#EEEEEE", fontSize:"3.5rem" },
      title: "Privacy",
      titleStyle: {
        color: "#EEEEEE",
        marginTop: "1rem",
        fontSize: "2rem",
        fontFamily: "Montserrat",
        display:"block"
      },
      content: "Doctors dont share any data with us.",
      contentStyle: {
        color: "#EEEEEE",
        marginTop: "1rem",
        fontSize: "1.2rem",
        fontFamily: "Montserrat",
      }
    },
    {
      icon: "fas fa-search-dollar",
      iconStyle: { color: "#EEEEEE", fontSize:"3.5rem" },
      title: "Low costs",
      titleStyle: {
        color: "#EEEEEE",
        marginTop: "1rem",
        fontSize: "2rem",
        fontFamily: "Montserrat",
      },
      content: "Prices are driven by market, that means you!",
      contentStyle: {
        color: "#EEEEEE",
        marginTop: "1rem",
        fontSize: "1.2rem",
        fontFamily: "Montserrat",
      }
    },
    {
      icon: "fas fa-laptop-house",
      iconStyle: { color: "#EEEEEE", fontSize:"3.5rem" },
      title: "Remote",
      titleStyle: {
        color: "#EEEEEE",
        marginTop: "1rem",
        fontSize: "2rem",
        fontFamily: "Montserrat",
      },
      content: "Access it from anywhere.",
      contentStyle: {
        color: "#EEEEEE",
        marginTop: "1rem",
        fontSize: "1.2rem",
        fontFamily: "Montserrat",
      }
    },
  ];
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "45rem",
          padding: "10rem",
          backgroundColor: "#00ADB5",
        }}
      >
        <h1
          style={{
            color: "#222831",
            marginBottom: "3rem",
            fontSize: "3rem",
            fontFamily: "Montserrat",
          }}
        >
          Instahelp.
        </h1>
        <h1
          style={{
            color: "#222831",
            marginTop: "15rem",
            fontSize: "3.5rem",
            fontFamily: "Montserrat",
          }}
        >
          Pick a specialist from <br />
          thousands of curated doctors.
        </h1>
        <img
          alt="tree"
          src={tree}
          style={{
            width: "38rem",
            position: "absolute",
            right: "10rem",
            top: "17.7rem",
          }}
        />
      </Box>
      <Box sx={{ width: "100%", height:"20.4rem", backgroundColor: "#222831", padding:"7rem"}}>
        <Stack direction="row" spacing={50}>
          {featuresData.map((feature) => {
            return <Features data={feature} />;
          })}
        </Stack>
      </Box>
    </div>
  );
}

function Features(props) {
  return (
    <div>
    {console.log(props)}
      <i class={props.data.icon} style={props.data.iconStyle}></i>
      <h1
        style={props.data.titleStyle}
      >
        {props.data.title}
      </h1>
      <h1 style={props.data.contentStyle}>{props.data.content}</h1>
    </div>
  );
}

export default Home;
