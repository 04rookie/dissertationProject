import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./LoginStyles.module.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@material-ui/core";
const axios = require("axios");
//logic for login page
function LoginContainer(props) {
  const [contact, setContact] = useState({
    email: "",
    loginPassword: "",
    status: "",
  });
  const [isDoctor, setIsDoctor] = useState(false);
  let history = useHistory();

  function handleChange(event) {
    const { name, value } = event.target;

    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function setStatus() {
    setContact((prevValue) => {
      return {
        ...prevValue,
        status: "Login failed.",
      };
    });
  }

  function handleClick(event) {
    const type = event.target.name;
    const success = validation();
    event.preventDefault();
    if (success === false) {
      setStatus();
      return;
    } else if (success === true && type === "submit") {
      if (!isDoctor) {
        postServerLogin({
          email: contact.email,
          loginPassword: contact.loginPassword,
        });
      }
      else{
        postServerDoctorLogin({
          email: contact.email,
          loginPassword: contact.loginPassword,
        })
      }
    }
    event.preventDefault();
  }

  function validation() {
    if (contact.email === null || contact.email === "") {
      return false;
    } else if (contact.loginPassword === null || contact.email === "") {
      return false;
    } else return true;
  }

  async function postServerLogin(credentials) {
    try {
      const response = await axios.post("/api/login", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      if (response.data.loginStatus === true) {
        //setAppState(<UserPageContainer userData = {response.data} callVideoChatRoom={callVideoChatRoom}/>);
        if(response.data.token){
          localStorage.setItem("userID", JSON.stringify(response.data.token));
        }
        props.setLoginContext(response.data.userID);
        const loadUserPage = () =>
          history.push({
            pathname: "/user-page/" + response.data.userID,
            state: { data: response.data },
          });
        loadUserPage();
      } else if(response.data.loginStatus===false){
        console.log(response.data.loginStatus)
        setStatus();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function postServerDoctorLogin(credentials) {
    try {
      const response = await axios.post("/api/login/doctor", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.loginStatus === true) {
        //setAppState(<UserPageContainer userData = {response.data} callVideoChatRoom={callVideoChatRoom}/>);
        if(response.data.token){
          localStorage.setItem("userID", JSON.stringify(response.data.token));
        }
        props.setLoginContext(response.data.userID);
        props.setDoctorIDContext(response.data.doctorID);
        const loadUserPage = () =>
          history.push({
            pathname: "/doctor/" + response.data.doctorID,
            state: { data: response.data },
          });
        loadUserPage();
      } else {
        setStatus();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{height:"100vh"}}
      className={["col-lg-6", styles.loginContainer, styles.container].join(
        " "
      )}
    >
      <h1>Login</h1>
      <p>{contact.email}</p>
      <form>
        <input
          onChange={handleChange}
          name="email"
          value={contact.email}
          placeholder="Email"
          autoComplete="off"
        />
        <input
          onChange={handleChange}
          type="password"
          name="loginPassword"
          placeholder="Password"
          autoComplete="off"
        />
        <Box>
          <FormGroup>
            <FormControlLabel
              sx={{ mx: "auto" }}
              control={<Checkbox />}
              label="Are you a doctor?"
              onClick={() =>
                setIsDoctor((prev) => {
                  return prev ? false : true;
                })
              }
            />
          </FormGroup>
        </Box>
        <button type="submit" onClick={handleClick} name="submit">
          Submit
        </button>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <button type="submit" name="signupButton">
            Sign Up
          </button>
        </Link>
      </form>
      <h3>{contact.status}</h3>
    </div>
  );
}

export default LoginContainer;
