import React from "react";
import IntroContainer from "./IntroContainer";
import RegisterContainer from "./RegisterContainer";
function RegisterApp(props) {
  return (
    <div className="row">
      <RegisterContainer />
      <IntroContainer />
    </div>
  );
}

export default RegisterApp;
