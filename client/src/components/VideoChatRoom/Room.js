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
function Room(props) {
  let meeting, meetingInfo;
  const userID = useContext(CurrentUserId);
  const [roomInfo, setRoomInfo] = useState(props.location.state.data);
  useEffect(() => {
    meeting = new window.Metered.Meeting();
    postRoom().then((success) => {
      console.log(success + "logging success");
      joinMeeting().then(() => {
        showMe();
        showThem();
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
    meetingInfo = await meeting.join({
      roomURL: "instahelp.metered.live/" + roomInfo.roomID,
      name: "John Doe",
    });
  }

  function showMe() {
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
  }

  function showThem() {
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
      videoTag.class = remoteTrackItem.participantSessionId;

      // Adding the video tag to container where we will display
      // All the remote streams
      $("#userTwoVideo").append(videoTag);
    });
  }

  function handleVideo() {
    try {
      meeting.startVideo();
    } catch (ex) {
      console.log("Error occurred whern sharing camera", ex);
    }
  }

  function handleMute() {
    try {
      meeting.startAudio();
    } catch (ex) {
      console.log("Error occurred whern sharing microphone", ex);
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
    deleteRoom().then((response) => {
      if (typeof userID === "undefined") {
        handleSessionCloseForDoctor();
      } else {
        console.log("user" + userID);
        deleteRoom();
      }
    });
  };

  async function handleSessionCloseForDoctor() {
    await axios.get("/api/user/" + roomInfo.userID).then(async (response) => {
      console.log("loggin response");
      console.log(response);
      console.log(response.data.sessionCount + " response session count");
      let sessionCount = response.data.sessionCount.filter(
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
  }

  const handleActionFalse = () => {
    setOpen(false);
  };

  async function deleteRoom() {
    const response = await axios.delete("/api/room/" + roomInfo.roomID, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response + "inside delete room room.js");
    return response;
  }

  return (
    <Box>
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
              {"Do you consider this as a successful session?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Agreeing to this will result in
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleActionFalse}>Disagree</Button>
              <Button onClick={handleActionTrue}>Agree</Button>
            </DialogActions>
          </Dialog>
        </div>
        <Grid>
          <Grid item xs={6}>
            {roomInfo.roomID}
            <video
              width="320"
              height="240"
              id="userVideo"
              autoPlay
              muted
            ></video>
          </Grid>
          <Grid item xs={6}>
            <div id="userTwoVideo"></div>
          </Grid>
        </Grid>
        <Box>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={handleMute}>Mute</Button>
            <Button onClick={handleDisconnect}>Disconnect</Button>
            <Button onClick={handleVideo}>Video</Button>
            <Button>Their Video</Button>
            <Button>Unmute</Button>
          </ButtonGroup>
        </Box>
      </Stack>
    </Box>
  );
}

export default Room;
