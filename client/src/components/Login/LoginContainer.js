import React, {useState} from "react";
import "./LoginStyles.css";
import RegisterContainer from "./RegisterContainer";
function LoginContainer(props){
  const [contact, setContact] = useState({
    email: "",
    loginPassword: ""
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

  function handleClick(event)
  {
    const type = event.target.name;
    if(type === "signupButton"){
      props.handleSignUp();
    }
    else if(type === "submit")
    {
      props.callHandleLoginFromApp({email: contact.email, loginPassword: contact.loginPassword});
    }
    event.preventDefault();
  }

  return (
    <div className="col-lg-6 loginContainer container">
      <h1>
        Login
      </h1>
      <p>{contact.email}</p>
      <form>
        <input
          onChange={handleChange}
          name="email"
          value={contact.email}
          placeholder="Email"
          autoComplete="off"
        />
        <input onChange={handleChange} type="password" name="loginPassword" placeholder="Password" autoComplete="off"/>
        <button type="submit" onClick={handleClick} name="submit">Submit</button>
        <button type="submit" onClick={handleClick} name="signupButton">Sign Up</button>
      </form>
    </div>
  );
}

export default LoginContainer;
