import React, { useState } from "react";
import axios from "axios";
function DoctorRegistration() {
  const [doctor, setDoctor] = useState({
    doctorName: ""
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
        <input
          type="text"
          name="doctorName"
          onChange={handleChange}
          value={doctor.doctorName}
        />
        <input type="submit" name="submit" onClick={handleSubmit} />
      </form>{" "}
    </div>
  );
}

export default DoctorRegistration;
