import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import "./LoginStyles.css";
const axios = require("axios");

function LoginContainer(props){
  const [contact, setContact] = useState({
    email: "",
    loginPassword: "",
    status:""
  });
  let history = useHistory();

  function handleChange(event) {
    const { name, value } = event.target;

    setContact(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  function setStatus(){
    setContact(prevValue=>{
      return {
        ...prevValue,
        status: "Login failed."
      }
    })
  }

  function handleClick(event)
  {
    const type = event.target.name;
    const success = validation();
    event.preventDefault();
    if(success === false){
      setStatus();
      return
    }
    else if(success=== true && type==="submit"){
      postServerLogin({email: contact.email, loginPassword: contact.loginPassword});
    }
    event.preventDefault();
  }
  
  function validation(){
    if(contact.email===null || contact.email===""){
      return false;
    }
    else if(contact.loginPassword===null || contact.email===""){
      return false;
    }
    else return true;
  }

  async function postServerLogin(credentials){
    try{
        const response = await axios.post("/Login", credentials,  {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        console.log(response);
        if(response.data.loginStatus===true){
            //setAppState(<UserPageContainer userData = {response.data} callVideoChatRoom={callVideoChatRoom}/>);
            const loadUserPage = ()=> history.push({pathname:"/user-page", state: {data:response.data} });
            loadUserPage();
        }
        else{
          setStatus();
        }
        
    }
    catch(error){
        console.log(error);
    }
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
        <Link to="/register" style={{ textDecoration: 'none' }}><button type="submit" name="signupButton">Sign Up</button></Link>
        <h3>{contact.status}</h3>
      </form>
    </div>
  );
}

export default LoginContainer;
