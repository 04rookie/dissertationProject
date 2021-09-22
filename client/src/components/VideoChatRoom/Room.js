import React, { useEffect, useState } from "react";
import { Stack, Box, Grid } from "@material-ui/core";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import $ from "jquery";
import axios from "axios";
function Room(props) {
  let meeting, meetingInfo;
  const [roomInfo, setRoomInfo] = useState(props.location.state.data);
  useEffect(() => {
    meeting = new window.Metered.Meeting();
    postRoom().then((success) => {
      console.log(success);
      showMe();
      showThem();
      joinMeeting();
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
  return (
    <Box>
      <Stack spacing={3}>
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
            <Button>Disconnect</Button>
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
