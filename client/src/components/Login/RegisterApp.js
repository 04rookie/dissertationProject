import React, {useEffect, useState} from "react";
import { Route, Switch } from "react-router-dom";
import IntroContainer from "./IntroContainer";
import LoginContainer from "./LoginContainer";
import RegisterContainer from "./RegisterContainer";
function RegisterApp(props){
    const [loginAppState, setLoginAppState] = useState(<LoginContainer handleSignUp={handleSignUp} 
        callHandleLoginFromApp={props.callHandleLoginFromApp}
    />);

    function handleSignUp(){
        setLoginAppState(<RegisterContainer handleLogin={handleLogin}
        callHandleRegisterFromApp={props.callHandleRegisterFromApp}/>);
    }

    function handleLogin(){
        setLoginAppState(<LoginContainer handleSignUp={handleSignUp} 
        callHandleLoginFromApp={props.callHandleLoginFromApp}
        />);
    }

    return <div className="row">
        <RegisterContainer />
        <IntroContainer />
    </div>
}

export default RegisterApp;