import React from "react";
import { Box, Stack } from "@material-ui/core";
import tree from "./tree.png";
function Home() {
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
  return (
    <div>
      <div style={{width:"100%", height:"100%"}}>
        <Box
          sx={{
            width: "100%",
            padding: "6.5vw",
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
          <img
            alt="tree"
            src={tree}
            style={{
              width: "28vw",
              position: "absolute",
              right: "10vw",
              top: "12.8vw",
            }}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#222831",
            padding: "5vw",
          }}
        >
          <Stack direction="row" sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            {featuresData.map((feature) => {
              return <Features data={feature} />;
            })}
          </Stack>
        </Box>
      </div>
    </div>
  );
}

function Features(props) {
  return (
    <div style={{marginLeft:"5vw", marginRight:"5vw", textAlign:"center"}}>
      {console.log(props)}
      <i class={props.data.icon} style={props.data.iconStyle}></i>
      <h1 style={props.data.titleStyle}>{props.data.title}</h1>
      <h1 style={props.data.contentStyle}>{props.data.content}</h1>
    </div>
  );
}

export default Home;
