import React, {useState} from "react";
import "./LoginStyles.css";

function RegisterContainer(props){
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: "",
    registrationPassword: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setContact(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }
  
  function handleSubmit(event){
    const type = event.target.name;
    if(type==="signupButton"){
      console.log("calling from reg cont callHandleRegisterFromApp")
      props.callHandleRegisterFromApp(contact);
    }
    else if(type==="goToLoginButton"){
      props.handleLogin();
    }
    event.preventDefault();
  }

  return (
    <div className="col-lg-6 loginContainer container">
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
        <input onChange={handleChange} name="registrationPassword" placeholder="Password" autoComplete="off"  />
        <button type="submit" onClick={handleSubmit} name="signupButton">Submit</button>
        <button type="submit" onClick={handleSubmit} name="goToLoginButton"> Go to login page</button>
      </form>
    </div>
  );
}

export default RegisterContainer;