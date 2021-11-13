import React from "react";
const subHeadingStyle = {
  color: "#00ADB5",
  fontSize: "1.3vw",
};
const text = {
  color: "#EEEEEE",
  fontSize: ".8vw",
};

function Bio(props) {
  return (
    <div style={{ textAlign: "left", paddingLeft: "7vw", paddingRight:"7vw" }}>
      <h1 style={subHeadingStyle}>
        {props.bio.doctorFirstName + " " + props.bio.doctorLastName}
      </h1>
      <h1 style={text}>{props.bio.doctorDegree}</h1>
      <h1 style={text}>{props.bio.doctorLanguage}</h1>
      <br />
      <h1 style={text}>{props.bio.doctorQuote}</h1><br />
      <h1 style={subHeadingStyle}>Approach</h1>
      <h1 style={text}>{props.bio.doctorApproach}</h1><br />
      <h1 style={subHeadingStyle}>Thoughts on counseling</h1>
      <h1 style={text}>{props.bio.doctorThought}</h1><br />
      <h1 style={subHeadingStyle}>Why I chose counseling</h1>
      <h1 style={text}>{props.bio.doctorWhy}</h1><br />
      <h1 style={subHeadingStyle}>Therapy style</h1>
      <h1 style={text}>{props.bio.doctorStyle}</h1><br />
      <h1 style={subHeadingStyle}>Concerns close to my heart</h1>
      <h1 style={text}>{props.bio.doctorConcern}</h1><br />
      <h1 style={subHeadingStyle}>How I handle stress</h1>
      <h1 style={text}>{props.bio.doctorHandle}</h1>
    </div>
  );
}

export default Bio;
