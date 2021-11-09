import React, { useState } from "react";
import styles from "./LoginStyles.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import BasicDatePicker from "../Date/BasicDatePicker";
//logic for register page
function RegisterContainer(props) {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: "",
    registrationPassword: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    const type = event.target.name;
    if (type === "signupButton") {
      console.log("calling from reg cont callHandleRegisterFromApp");
      postServerRegister(contact);
    }
    event.preventDefault();
  }

  async function postServerRegister(credentials) {
    try {
      const response = await axios.post("/api/register", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={["col-lg-6", styles.loginContainer, styles.container].join(
        " "
      )}
    >
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form autoComplete="new-password">
        <input
          onChange={handleChange}
          name="fName"
          value={contact.fName}
          placeholder="First Name"
          autoComplete="new-password"
        />
        <input
          onChange={handleChange}
          name="lName"
          value={contact.lName}
          placeholder="Last Name"
          autoComplete="new-password"
        />
        <input
          onChange={handleChange}
          name="email"
          value={contact.email}
          placeholder="Email"
          autoComplete="new-password"
        />
        <input
          onChange={handleChange}
          name="registrationPassword"
          placeholder="Password"
          autoComplete="off"
        />
        <button type="submit" onClick={handleSubmit} name="signupButton">
          Submit
        </button>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <button type="submit" name="goToLoginButton">
            Go to login page
          </button>
        </Link>
      </form>
    </div>
  );
}

export default RegisterContainer;
