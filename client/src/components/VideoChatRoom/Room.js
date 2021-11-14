import React, { useEffect, useState, useContext } from "react";
import { Stack, Box, Grid } from "@material-ui/core";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import $ from "jquery";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CurrentUserId from "../Context/CurrentUserId";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";
import Rating from "@mui/material/Rating";
import AuthHeader from "../Auth/Auth";
function Room(props) {
  const [live, setLive] = useState("");
  const [meeting, setMeeting] = useState(new window.Metered.Meeting());
  let meetingInfo;
  let history = useHistory();
  const userID = useContext(CurrentUserId);
  const [userType, setUserType] = useState();
  const [localAudio, setLocalAudio] = useState(false);
  const [localVideo, setLocalVideo] = useState(false);
  const [roomInfo, setRoomInfo] = useState(props.location.state.data);
  useEffect(() => {
    if (typeof userID === "undefined") {
      setUserType("doctor");
    } else {
      setUserType("patient");
    }
    postRoom().then((success) => {
      console.log(success + "logging success");
      joinMeeting().then(() => {
        setLive("Live.")
        console.log("joined");
        showMe().then(() => showThem());
      });
    });
  }, []);

  async function postRoom() {
    try {
      console.log(roomInfo.roomID);
      const response = await axios.post(
        "/api/metered/room/" + roomInfo.roomID,
        roomInfo,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async function joinMeeting() {
    const name = userType==="doctor"?roomInfo.doctorID:roomInfo.userID;
    try{
      //setMeeting(new window.Metered.Meeting())
      //meeting = new window.Metered.Meeting();
      meetingInfo = await meeting.join({
        roomURL: "instahelp.metered.live/" + roomInfo.roomID,
        name: name,
      });
      return true;
    }
    catch(err){
      console.log("error in joining")
      console.log(err)
    }
    return meetingInfo;
  }

  async function showMe() {
    meeting.on("localTrackStarted", function (item) {
      if (item.type === "video") {
        /**
         * localTrackStarted event emits a MediaStreamTrack
         * but we cannot assign MediaStreamTrack into the html video tag
         * hence we are creating MediaStream object, a MediaStream
         * can be assigned to the html video tag.
         */
        var track = item.track;
        var mediaStream = new MediaStream([track]);
        /**
         * We have a video tag on the page with id
         * localvideo
         * e.g: <video id="localvideo" autoplay muted></video>
         * This video tag will show the user their own video
         */
        document.getElementById("userVideo").srcObject = mediaStream;
        document.getElementById("userVideo").play();
      }
    });
    return true;
  }

  async function showThem() {
    /**
     * remoteTrackItem = {
     *   streamId: "eaa6104b-390a-4b0a-b8d1-66f7d19f8c1a",
     *   type: "video"
     *   participantSessionId: "60fef02300f4a23904ab4862"
     *   track: MediaStreamTrack,
     *   name: "Jane Smith"
     * }
     */
    meeting.on("remoteTrackStarted", function (remoteTrackItem) {
      console.log("remoteTrackStarted", remoteTrackItem);
      // Converting MediaStreamTrack to MediaStream
      var track = remoteTrackItem.track;
      var stream = new MediaStream([track]);

      // Creating a videoTag to show the remote stream
      const videoTag = document.createElement("video");
      videoTag.autoplay = true;
      videoTag.srcObject = stream;
      videoTag.playsinline = true;
      // We are setting the id of the videoTag to the streamId
      // So that when this track is stopped we can remove the
      // videoTag from the page.
      videoTag.id = remoteTrackItem.streamId;
      // Setting the class name to participantSessionId so that when this participant
      // leaves we can easily remove all the video tags associated with this
      // participant.
      //videoTag.class = remoteTrackItem.participantSessionId;
      videoTag.class = "styleVideo";
      // Adding the video tag to container where we will display
      // // All the remote streams
      videoTag.height = 400;
      // videoTag.width = 320;
      $("#otherUser").append(videoTag);
    });
    return true;
  }

  // async function handleStartVideo() {
  //   try {
  //     const response = await meeting.startVideo();
  //     return response;
  //   } catch (ex) {
  //     console.log("Error occurred whern sharing camera", ex);
  //   }
  // }

  // async function handleStartAudio() {
  //   try {
  //     const response = await meeting.startAudio();
  //     return response;
  //   } catch (ex) {
  //     console.log("Error occurred whern sharing microphone", ex);
  //   }
  // }

  async function handleLocalVideo() {
    try {
      console.log("before: " + localVideo);
      //setLocalVideo(true);
      await meeting.startVideo();
      await meeting.resumeLocalVideo();
      console.log("after: " + localVideo);
      return true;
    } catch (ex) {
      //joinMeeting();
      console.log("Error occurred whern sharing camera", ex);
    }
  }

  async function handleLocalAudio() {
    try {
      //setLocalAudio(true);
      await meeting.startAudio();
      await meeting.unmuteLocalAudio();
      return true;
    } catch (ex) {
      //joinMeeting();
      console.log("Error occurred whern sharing local microphone", ex);
    }
  }

  const [open, setOpen] = React.useState(false);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  function handleDisconnect() {
    setOpen(true);
  }

  const handleActionTrue = () => {
    setOpen(false);
    console.log(userID + " userid");
    console.log(roomInfo.userID);
    if (typeof userID === "undefined") {
      deleteRoom()
        .then(() => handleSessionCloseForDoctor())
        .then(() => closeMeeting())
        .then(() => {
          const loadUserPage = () =>
            history.push({
              pathname: "/doctor/" + roomInfo.doctorID,
            });
          loadUserPage();
        });
    } else {
      console.log("user" + userID);
      handleSessionCloseForPatient();
    }
    return true;
  };

  async function closeMeeting() {
    try {
      const response = await meeting.stopAudio()
      await meeting.stopVideo()
      await meeting.leaveMeeting();
      return response;
    } catch (err) {
      console.log("err");
      console.log(err)
    }
  }

  async function handleSessionCloseForDoctor() {
    await axios.get("/api/public/user/" + roomInfo.userID, {
      headers: AuthHeader(),
    }).then(async (response) => {
      console.log("loggin response");
      console.log(response);
      console.log(response.data.sessionCount + " response session count");
      let sessionCount = response.data.userSubscription.filter(
        (element) => element.doctorID === roomInfo.doctorID
      );
      let test = sessionCount[0].sessionCount;
      console.log(test + " test");
      if (test > 0) {
        await axios.patch(
          "/api/user/" + roomInfo.userID + "/user-subscription/session-count",
          { doctorID: roomInfo.doctorID },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        await axios.delete(
          "/api/user/" +
            roomInfo.userID +
            "/user-subscription/doctor/" +
            roomInfo.doctorID,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    });
    return true;
  }

  async function handleSessionCloseForPatient() {
    await axios.get("/api/user/" + roomInfo.userID, {
      headers: AuthHeader(),
    }).then(async (response) => {
      console.log(response)
      let sessionCount = response.data.sessionCount.filter(
        (element) => element.doctorID === roomInfo.doctorID
      );
      let test = sessionCount[0].sessionCount;
      if (test > 0) {
        closeMeeting().then(() => {
          const loadUserPage = () =>
            history.push({
              pathname: "/user-page/" + roomInfo.userID,
            });
          loadUserPage();
        });
      } else {
        setOpenReview(true);
      }
    });
    return true;
  }

  const handleActionFalse = () => {
    setOpen(false);
    if (typeof userID === "undefined") {
      deleteRoom().then(() => {
        closeMeeting().then(() => {
          const loadUserPage = () =>
            history.push({
              pathname: "/doctor/" + roomInfo.doctorID,
            });
          loadUserPage();
        });
      });
    }
    return true;
  };

  async function deleteRoom() {
    const response = await axios.delete("/api/room/" + roomInfo.roomID, {
      headers: { "Content-Type": "application/json" },
      data: {doctorID: roomInfo.doctorID, appointmentID: roomInfo.appointmentID}
    });
    console.log(response + "inside delete room room.js");
    return response;
  }

  const docData = {
    title: "Do you consider this as a successful session?",
    text: "Agreeing to this will deduct a session from patient's account.",
  };

  const patientData = {
    title: "Are you sure you want to leave?",
    text: "You will be redirected to your home page.",
  };

  const [openReview, setOpenReview] = React.useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [rating, setRating] = useState(3);
  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };
  const handleReviewTitleChange = (event) => {
    setReviewTitle(event.target.value);
  };

  const handleReviewActionFalse = () => {
    setOpenReview(false);
    closeMeeting().then(() => {
      const loadUserPage = () =>
        history.push({
          pathname: "/user-page/" + roomInfo.userID,
        });
      loadUserPage();
    });
    return true;
  };

  const handleReviewActionTrue = () => {
    setOpenReview(false);
    const date = new Date();
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date
    );
    const day = date.getDate();
    const year = date.getFullYear();
    const dateString = month + ", " + day + ", " + year;
    const review = {
      userID: roomInfo.userID,
      doctorID: roomInfo.doctorID,
      reviewTitle: reviewTitle,
      reviewText: reviewText,
      rating: rating,
      reviewDate: dateString,
    };
    closeMeeting().then(() => {
      postReviewServer(review).then(() => {
        const loadUserPage = () =>
          history.push({
            pathname: "/user-page/" + roomInfo.userID,
          });
        loadUserPage();
      });
    });
    return true;
  };

  async function postReviewServer(review) {
    const response = await axios.post(
      "/api/user/" +
        roomInfo.userID +
        "/doctor/" +
        roomInfo.doctorID +
        "/review",
      review,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  }

  return (
    <Box>
    <div style={{padding:"2vw", color:"#E84545"}}>{live}</div>
      <Stack spacing={3}>
        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleActionFalse}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              {userType === "doctor" ? docData.title : patientData.title}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {userType === "doctor" ? docData.text : patientData.text}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleActionFalse}>No</Button>
              <Button onClick={handleActionTrue}>Yes</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={openReview}
            keepMounted
            onClose={handleReviewActionFalse}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle style={{ marginLeft: ".5vw", margin: "1vw" }}>This was your last session.</DialogTitle>
            <DialogContent>
              <DialogContentText style={{ margin: ".5vw" }} id="alert-dialog-slide-description">
                If you wish to share your experience with others of your
                journey, please feel free to leave a comment
              </DialogContentText>
              <div>
              <Rating
                name="userRating"
                value={rating}
                style={{ margin: ".5vw" }}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
              </div>
              <TextField
                id="reviewTitle"
                label="Title"
                multiline
                maxRows={2}
                style={{ margin: ".5vw" }}
                value={reviewTitle}
                onChange={handleReviewTitleChange}
                variant="filled"
                name="reviewTitle"
              />
              <TextField
                id="reviewText"
                label="Multiline"
                multiline
                maxRows={4}
                style={{ margin: ".5vw" }}
                value={reviewText}
                onChange={handleReviewChange}
                variant="filled"
                name="reviewText"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleReviewActionFalse}>Maybe later</Button>
              <Button onClick={handleReviewActionTrue}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
        <Grid container>
          <Grid
            item
            xs={6}
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ display: "flex" }}
          >
            {/* {roomInfo.roomID} */}
            <video className="styleVideo" id="userVideo" autoPlay muted height="400"></video>
          </Grid>
          <Grid
            item
            xs={6}
            id="otherUser"
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ display: "flex" }}
          ></Grid>
        </Grid>
        <Box>
        <div style={{display:"flex", justifyContent:"center"}}>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={handleLocalAudio}>Start Audio</Button>
            <Button onClick={handleDisconnect}>Disconnect</Button>
            <Button onClick={handleLocalVideo}>Start Video</Button>
          </ButtonGroup>
          </div>
        </Box>
      </Stack>
    </Box>
  );
}

export default Room;