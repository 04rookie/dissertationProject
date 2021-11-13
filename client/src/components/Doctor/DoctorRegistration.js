import React, { useState } from "react";
import axios from "axios";
function DoctorRegistration() {
  const [doctor, setDoctor] = useState({
    doctorFirstName: "",
    doctorLastName: "",
    doctorEmail: "",
    doctorPassword: "",
    doctorRate: "",
    doctorQuote:"",
    doctorLanguage: "",
    doctorApproach: "",
    doctorDegree:"",
    doctorThought:"",
    doctorWhy: "",
    doctorStyle: "",
    doctorConcern: "",
    doctorHandle:""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setDoctor((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    postServerDoctor(doctor);
  }

  async function postServerDoctor(doctor) {
    try {
      const response = await axios.post("/api/register-doctor", doctor, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <form>
      fname
        <input
          type="text"
          name="doctorFirstName"
          onChange={handleChange}
          value={doctor.doctorFirstName}
        />
        lname
        <input
          type="text"
          name="doctorLastName"
          onChange={handleChange}
          value={doctor.doctorLastName}
        />
        pass
        <input
          type="text"
          name="doctorPassword"
          onChange={handleChange}
          value={doctor.doctorPassword}
        />
        email
        <input
          type="text"
          name="doctorEmail"
          onChange={handleChange}
          value={doctor.doctorEmail}
        />
        rate
        <input
          type="text"
          name="doctorRate"
          onChange={handleChange}
          value={doctor.doctorRate}
        />
        Quote
        <input
          type="text"
          name="doctorQuote"
          onChange={handleChange}
          value={doctor.doctorQuote}
        />
        Language
        <input
          type="text"
          name="doctorLanguage"
          onChange={handleChange}
          value={doctor.doctorLanguage}
        />
        Approach
        <input
          type="text"
          name="doctorApproach"
          onChange={handleChange}
          value={doctor.doctorApproach}
        />
        Degree
        <input
          type="text"
          name="doctorDegree"
          onChange={handleChange}
          value={doctor.doctorDegree}
        />
        Thought<input
          type="text"
          name="doctorThought"
          onChange={handleChange}
          value={doctor.doctorThought}
        />
        Why
        <input
          type="text"
          name="doctorWhy"
          onChange={handleChange}
          value={doctor.doctorWhy}
        />
        style
        <input
          type="text"
          name="doctorStyle"
          onChange={handleChange}
          value={doctor.doctorStyle}
        />
        Concerns
        <input
          type="text"
          name="doctorConcern"
          onChange={handleChange}
          value={doctor.doctorConcern}
        />
        Handle
        <input
          type="text"
          name="doctorHandle"
          onChange={handleChange}
          value={doctor.doctorHandle}
        />
        <input type="submit" name="submit" onClick={handleSubmit} />
      </form>{" "}
    </div>
  );
}

export default DoctorRegistration;
