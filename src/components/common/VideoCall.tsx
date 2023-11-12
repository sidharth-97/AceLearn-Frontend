import React, { useCallback, useEffect, useState } from "react";
import socket from "../../services/socket";
import ReactPlayer from "react-player";
import peer from "../../services/peer";
import camera from '../../assets/camera.png';
import invite from '../../assets/invite.png';
import mic from '../../assets/mic.png'
import phone from '../../assets/phone.png'
import { LuScreenShare, LuScreenShareOff } from 'react-icons/lu'

type UserData = {
  tutor: string;
  id: string;
};

const VideoCall: React.FC = () => {
  const [remoteSocketId, setremoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState("");
  const [remoteStream, setRemoteStream] = useState("");
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

  const handleUserJoined = useCallback(({ tutor, id }: UserData) => {
    console.log(tutor, id);
    setremoteSocketId(id as any);
  }, []);

  let constrains = {
    video: {
      width: { min: 640, ideal: 1920, max: 1920 },
      height:{min:480,ideal:1080,max:1080}
    },
    audio:true
  }

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia(constrains);
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream as any);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }: { offer: string; from: string }) => {
      setremoteSocketId(from as any);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log("Incomming call from", from, offer);
      const ans = await peer.getAnswer(offer);
      console.log(ans, "first ans");

      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      console.log(`Received call accepted from ${from}, ans:`, ans);

      peer.setLocalDescription(ans);
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      // Cleanup: remove the event listener when the component unmounts
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);


  const handleStartScreenShare = async () => {
    try {
      const stream = await peer.startScreenShare(myStream);
      socket.emit('startScreenShare', { to: remoteSocketId });
      setIsScreenSharing(true);
      setScreenStream(stream);
    } catch (error) {
      console.error('Error starting screen share:', error);
    }
  };

  const handleStopScreenShare = () => {
    peer.stopScreenShare(myStream, screenStream);
    socket.emit('stopScreenShare', { to: remoteSocketId });
    setIsScreenSharing(false);
    setScreenStream(null);
  };

  return (
    // <div>
    //   <h1>Video Call Room</h1>
    //   {/* Your video call content goes here */}
    //   <h5>{remoteSocketId ? "Connected" : "No one in the room"}</h5>

    //   {/* {myStream && <button onClick={sendStreams}>Send stream</button>} */}
    //   <div>
    //     <h1>My Stream</h1>
    <>
      <div className="grid grid-cols-1 h-screen overflow-hidden bg-black">
        {" "}
        {remoteSocketId && <button className=" text-white z-50" onClick={handleCallUser}>Call</button>}
        <div>
        <video
          autoPlay
          playsInline
          muted
          height="90%"
          width="100%"
          ref={(video) => {
            if (video && myStream instanceof MediaStream) {
              video.srcObject = myStream;
            }
          }}
        />
      </div>
      <div className="smallFrame">
        <video
          autoPlay
          playsInline
          muted
          height="90%"
          width="100%"
          ref={(video) => {
            if (video && remoteStream instanceof MediaStream) {
              video.srcObject = remoteStream;
            }
          }}
        />
      </div>
    
      </div>
      <div id="controls">
       
          {/* {myStream && <button onClick={sendStreams}>Send stream</button>} */}

          {myStream &&  <div className="control-container" id="camera-btn"><img src={camera} onClick={sendStreams}/>  </div>}
      

        <div className="control-container" id="mic-btn">
          <img src={mic} />
        </div>

       
          {remoteSocketId &&  <div className="control-container" id="mic-invite"><img src={invite} onClick={handleCallUser}/> </div>}
          {/* {remoteSocketId && <button className=" text-white z-50" >Call</button>} */}
       

        <div className="control-container" id="screen-share-btn">
          {isScreenSharing ? (
            <LuScreenShareOff onClick={handleStopScreenShare}/>
            // <button >Stop Screen Share</button>
          ) : (
             
            <div onClick={handleStartScreenShare} style={{ color: 'white', cursor: 'pointer' }}>
            <LuScreenShare size={24} />
          </div>
              
          )}
        </div>

        <a href="lobby.html">
          <div className="control-container" id="leave-btn">
            <img src={phone} />
          </div>
        </a>
      </div>
    </>

    //   </div>
    // </div>
  );
};

export default VideoCall;
