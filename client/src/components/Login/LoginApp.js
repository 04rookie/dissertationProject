import React, {useEffect, useState} from "react";
import IntroContainer from "./IntroContainer";
import LoginContainer from "./LoginContainer";
import RegisterContainer from "./RegisterContainer";
function LoginApp(props){
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
        {loginAppState}
        <IntroContainer />
    </div>
}

export default LoginApp;