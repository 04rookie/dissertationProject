import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Stack } from "@material-ui/core";
import axios from "axios";
import MarketDoctorCard from "./MarketDoctorCard";
function Market() {
  const [doctorID, setDoctorID] = useState("");
  let history = useHistory();
  const [skipValue, setSkipValue] = useState(0);
  const limitValue = 10;
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    //getServerDoctor();
    getServerDoctor().then((dataValues) => {
      setMarketData((prev) => {
        return [...prev, ...dataValues.data];
      });
    });
  }, [skipValue]);

  async function getServerDoctor() {
    try {
      const response = await axios.get("/api/doctor", {
        params: { skipValue: skipValue },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  function handleChange(e) {
    setDoctorID(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();

    const loadAppointment = () =>
      history.push({ pathname: "/appointment" + doctorID });
  }
  return (
    <div>
      <form>
        <input
          type="text"
          name="doctorID"
          value={doctorID}
          onChange={handleChange}
        ></input>
        <button type="submit" onClick={handleClick}>
          Book
        </button>
      </form>
      <Stack spacing={3}>
        {marketData.map((cardData) => {
          return <MarketDoctorCard key={cardData.doctorID} doctorID={cardData.doctorID} doctorName={cardData.doctorName}/>;
        })}
      </Stack>
    </div>
  );
}

export default Market;
