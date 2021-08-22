import React from "react";
import IntroContainer from "./IntroContainer";
import RegisterContainer from "./RegisterContainer";
function RegisterApp(props){
    // const [loginAppState, setLoginAppState] = useState(<LoginContainer handleSignUp={handleSignUp} 
    //     callHandleLoginFromApp={props.callHandleLoginFromApp}
    // />);

    // function handleSignUp(){
    //     setLoginAppState(<RegisterContainer handleLogin={handleLogin}
    //     callHandleRegisterFromApp={props.callHandleRegisterFromApp}/>);
    // }

    // function handleLogin(){
    //     setLoginAppState(<LoginContainer handleSignUp={handleSignUp} 
    //     callHandleLoginFromApp={props.callHandleLoginFromApp}
    //     />);
    // }

    return <div className="row">
        <RegisterContainer />
        <IntroContainer />
    </div>
}

export default RegisterApp;