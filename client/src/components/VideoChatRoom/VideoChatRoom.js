import React, {useEffect, useState} from "react";

function VideoChatRoom(props){
    let meeting;
    let meetingInfo;
    function handleClick(event){
        event.preventDefault();
        const type = event.target.name;
        if(type==="createRoom"){
            props.callCreateRoomFromApp();
            console.log("inside create room");
        }
        else if(type==="joinRoom"){
            joinMeeting();
            console.log("inside join room");
        }
        else if(type==="unMuteButton"){
            try{
                meeting.startAudio();
            } 
            catch (ex){
                console.log("Error occurred whern sharing microphone", ex);
            }
        }
        else if(type==="showVideoButton"){
            try{
                meeting.startVideo();
                showMe();
            } 
            catch(ex){
                console.log("Error occurred whern sharing camera", ex);
            }
        }
    }

    function showMe(){
        meeting.on("localTrackStarted", function(item) {
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
                document.getElementById("localvideo").srcObject = mediaStream;
                document.getElementById("localvideo").play();
            }
        });
    }

    async function joinMeeting(){
        meeting = new window.Metered.Meeting();
        meetingInfo = await meeting.join({
            roomURL: "instahelp.metered.live/meetupfour",
            name: "John Doe"
        });
    }

    return <div>Hello
    <form>
        <button type="submit" name="createRoom" onClick={handleClick}>Create Room</button>
        <button type="submit" name="deleteRoom" onClick={handleClick}>Delete Room</button>
        <button type="submit" name="joinRoom" onClick={handleClick}> Join Room</button>
        <button type="submit" name="unMuteButton" onClick={handleClick}>Unmute</button>
        <button type="submit" name="showVideoButton" onClick={handleClick}>Show Video</button>
        <video width="320" height="240" id="userVideo" autoPlay muted></video>
    </form>
    </div>;
}

export default VideoChatRoom;