import React from "react";
import IntroContainer from "./IntroContainer";
import LoginContainer from "./LoginContainer";
import styles from "./LoginStyles.module.css";
function LoginApp(props) {
  //login page
  return (
    <div className={["row", styles.loginAppContainer].join(" ")}>
      <LoginContainer />
      <IntroContainer />
    </div>
  );
}

export default LoginApp;
