import React from "react";
import IntroContainer from "./IntroContainer";
import LoginContainer from "./LoginContainer";
import styles from "./LoginStyles.module.css";
function LoginApp(props){
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

    return <div className={["row", styles.loginAppContainer].join(" ")}>
        <LoginContainer />
        <IntroContainer />
    </div>
}

export default LoginApp;