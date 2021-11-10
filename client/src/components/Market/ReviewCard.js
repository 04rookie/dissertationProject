import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";

function ReviewCard(props) {
  const [userName, setUserName] = useState("")
  useEffect(()=>{
    getUserName().then((response)=>{
      setUserName(response.data.userFirstName + " " +response.data.userLastName);
    })
  },[])

  async function getUserName(){
    return await axios.get("/api/public/user/" + props.data.userID);
  }
  return (
    <Card elevation={0} sx={{ width: "95%", borderBottom:1, borderRadius:0, m:1, Color:"#EEEEEE", backgroundColor:"#222831"}}>
      <CardContent align="left">
        <h1
          style={{
            color: "#EEEEEE",
            fontSize: ".8vw",
            fontFamily: "Montserrat",
          }}
        >
           User: {userName}
        </h1>
        <h1
          style={{
            color: "#EEEEEE",
            fontSize: ".6vw",
            fontFamily: "Montserrat",
          }}
        >
           On {props.data.reviewDate}
        </h1>
        <h1
          style={{
            color: "#EEEEEE",
            fontSize: ".8vw",
            fontFamily: "Montserrat",
          }}
        >
           Rating: {props.data.rating}
        </h1>
        <h1
          style={{
            color: "#EEEEEE",
            fontSize: ".8vw",
            fontFamily: "Montserrat",
          }}
        >
          {props.data.reviewTitle}
        </h1>
        <h1
          style={{
            color: "#EEEEEE",
            fontSize: ".6vw",
            fontFamily: "Montserrat",
          }}
        >
          {props.data.reviewText}
        </h1>
      </CardContent>
    </Card>
  );
}

function textCardStyle(props) {
  return (
    <h1
      style={{
        color: "#222831",
        fontSize: ".8vw",
        fontFamily: "Montserrat",
      }}
    >
      {props.label}: {props.data}
    </h1>
  );
}

export default ReviewCard;
