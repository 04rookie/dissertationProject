import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Stack } from "@material-ui/core";
import axios from "axios";
import MarketDoctorCard from "./MarketDoctorCard";
import ReviewCard from "./ReviewCard";
function Market(props) {
  const [doctorID, setDoctorID] = useState("");
  let history = useHistory();
  const [skipValue, setSkipValue] = useState(0);
  const limitValue = 10;
  const [marketData, setMarketData] = useState([]);
  const [review, setReview] = useState([]);
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

  function handleClickReviews(doctorID) {
    getReviews(doctorID);
  }

  async function getReviews(doctorID) {
    const response = await axios.get("/api/review/" + doctorID);
    setReview(response.data)
  }

  // generates random string of given length
  function makeid(length) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
      <Stack direction="row">
        <Stack spacing={3}>
          {marketData.map((cardData) => {
            return (
              <MarketDoctorCard
                key={cardData.doctorID}
                doctorID={cardData.doctorID}
                doctorName={cardData.doctorName}
                doctorRate={cardData.doctorRate}
                handleClickReviews={handleClickReviews}
              />
            );
          })}
        </Stack>
        <Stack spacing={3}>
          {review.map((data) => {
            return <ReviewCard key={makeid(5)} data={data} />;
          })}
        </Stack>
      </Stack>
    </div>
  );
}

export default Market;
