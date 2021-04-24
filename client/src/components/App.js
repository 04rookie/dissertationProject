import React, { useEffect, useState } from "react";
import LoginApp from "./Login/LoginApp"
const axios = require("axios");

function App(){
    function callHandleLoginFromApp(credentials){
        postServerLogin(credentials);
    }

    function callHandleRegisterFromApp(credentials){
        console.log("inside call handle reg from app and calling postserver")
        postServerRegister(credentials);
    }

    async function postServerLogin(credentials){
        try{
            const response = await axios.post("/Login", credentials,  {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            console.log(response);
        }
        catch(error){
            console.log(error);
        }
    }

    async function postServerRegister(credentials){
        try{
            const response = await axios.post("/Register", credentials, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
        }
        catch(error){
            console.log(error);
        }
    }
    return <LoginApp callHandleLoginFromApp={callHandleLoginFromApp}
        callHandleRegisterFromApp={callHandleRegisterFromApp}
    />;
}


export default App;