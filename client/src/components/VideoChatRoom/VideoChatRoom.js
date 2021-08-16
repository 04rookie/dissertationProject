import React, {useEffect, useRef, useState} from "react";
import $ from "jquery";
function VideoChatRoom(props){
    let meeting;
    let meetingInfo;
    let [dynamicRoomName, setDynamicRoomName] = useState();
    const [textBoxObjectDOM, settextBoxObjectDOM] = useState({
        roomid: "",
        temp: ""
    });

    function handleChange(event){
        const { name, value } = event.target;

        settextBoxObjectDOM(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }
    function handleClick(event){
        event.preventDefault();
        const type = event.target.name;
        if(type==="createRoom"){
            props.callCreateRoomFromApp().then((value)=>{
                setDynamicRoomName(value)
                let roomName = value;
                props.callPushRoomNameFromApp({roomNameKey: roomName});
                console.log(value);
            });
        }
        else if(type==="joinRoom"){
            joinMeeting();
            console.log("inside join room" + dynamicRoomName);
        }
        else if(type==="joinRoomTwo"){
            // props.getRoomNameFromApp().then((value)=>{
            //     setDynamicRoomName(value);
            //     console.log("User 2 joined at room " + dynamicRoomName);
            // });
            setDynamicRoomName(textBoxObjectDOM.roomid);
            console.log(textBoxObjectDOM.roomid);
            console.log(dynamicRoomName);
            joinMeeting();
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
        else if(type==="showThemVideoButton"){
            try{
                meeting.startVideo();
                showThem();
            }
            catch(err){
                console.log("Error" + err);
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
                document.getElementById("userVideo").srcObject = mediaStream;
                document.getElementById("userVideo").play();
            }
        });
    }
    
    function showThem(){
    /**
    * remoteTrackItem = { 
    *   streamId: "eaa6104b-390a-4b0a-b8d1-66f7d19f8c1a", 
    *   type: "video"
    *   participantSessionId: "60fef02300f4a23904ab4862"
    *   track: MediaStreamTrack,
    *   name: "Jane Smith"
    * }
    */
    meeting.on("remoteTrackStarted", function(remoteTrackItem) {
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

    async function joinMeeting(){
        console.log(dynamicRoomName + "inside join meeting");
        meeting = new window.Metered.Meeting();
        meetingInfo = await meeting.join({
            roomURL: "instahelp.metered.live/" + dynamicRoomName,
            name: "John Doe"
        });
    }

    return <div>Hello
    <form>
        <button type="submit" name="createRoom" onClick={handleClick}>Create Room</button>
        <button type="submit" name="deleteRoom" onClick={handleClick}>Delete Room</button>
        <button type="submit" name="joinRoom" onClick={handleClick}> Join Room</button>
        <button type="submit" name="unMuteButton" onClick={handleClick}>Unmute</button>
        <button type="submit" name="showVideoButton" onClick={handleClick}>Show Me</button>
        <button type="submit" name="showThemVideoButton" onClick={handleClick}>Show Them</button>
        <button type="submit" name="joinRoomTwo" onClick={handleClick}> Join Room 2</button>
        <input type="text" name="roomid" value={textBoxObjectDOM.roomid} onChange={handleChange}/>
        <video width="320" height="240" id="userVideo" autoPlay muted></video>
        <video width="320" height="240" id="userTwoVideo" autoPlay muted></video>
    </form>
    </div>;
}

export default VideoChatRoom;