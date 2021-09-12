import React, { useState } from "react";
import axios from "axios";
function DoctorRegistration() {
  const [doctor, setDoctor] = useState({
    doctorFirstName: "",
    doctorLastName: "",
    doctorEmail: "",
    doctorPassword: "",
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
        <input type="submit" name="submit" onClick={handleSubmit} />
      </form>{" "}
    </div>
  );
}

export default DoctorRegistration;
