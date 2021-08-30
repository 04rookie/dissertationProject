import React from "react";
import IntroContainer from "./IntroContainer";
import LoginContainer from "./LoginContainer";
import styles from "./LoginStyles.module.css";
function LoginApp(props) {
  return (
    <div className={["row", styles.loginAppContainer].join(" ")}>
      <LoginContainer />
      <IntroContainer />
    </div>
  );
}

export default LoginApp;
