import React, { useCallback, useEffect, useState } from "react";
import socket from "../../services/socket";
import peer from "../../services/peer";
import { FaVideo } from "react-icons/fa";
import { AiOutlineAudio } from "react-icons/ai";
import { HiOutlineUserAdd } from "react-icons/hi";
import { FaPhone } from "react-icons/fa";
import { LuScreenShare, LuScreenShareOff } from "react-icons/lu";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FaVideoSlash } from "react-icons/fa";

type UserData = {
  tutor: string;
  id: string;
};

const VideoCall: React.FC = () => {
  const [remoteSocketId, setremoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState<MediaStream | string>("");
  const [remoteStream, setRemoteStream] = useState<MediaStream | string>("");
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);

  const params = useParams()
  const navigate=useNavigate()
  console.log(params.roomId,"this is the id");
  
  const { isStudent } = useSelector((state: RootState) => state.auth)
  const { isTutor } = useSelector((state: RootState) => state.auth);
  
    if(!isStudent && !isTutor) {
    navigate("/")
  }

  const handleUserJoined = useCallback(({ tutor, id }: UserData) => {
    console.log(tutor, id);
    setremoteSocketId(id as any);
  }, []);

  let constrains = {
    video: {
      width: { min: 640, ideal: 1920, max: 1920 },
      height: { min: 480, ideal: 1080, max: 1080 },
    },
    audio: true,
  };

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia(constrains);
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream as any);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }: { offer: RTCSessionDescriptionInit; from: string }) => {
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
    if (typeof myStream === 'string') {
      console.error("Invalid myStream type");
      return;
    }
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }:{from:any,ans:any}) => {
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
    async ({ from, offer }:{from:any,offer:any}) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }:any) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev: { streams: any; }) => {
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
    myStream,
  ]);

  const handleStartScreenShare = async () => {
    try {
      if (typeof myStream === 'string') {
        // Handle the case where myStream is a string (if needed)
        console.error("Invalid myStream type");
        return;
      }
      const screenStream = await peer.startScreenShare(myStream);
      socket.emit("startScreenShare", { to: remoteSocketId });

      // Send the new screen stream to the peer
      peer.sendStreams(screenStream as MediaStream);
      setIsScreenSharing(true);
      setScreenStream(screenStream as MediaStream);
    } catch (error) {
      console.error("Error starting screen share:", error);
    }
  };

  const handleStopScreenShare = async () => {
    try {
      peer.stopScreenShare(myStream as MediaStream, screenStream);
      socket.emit("stopScreenShare", { to: remoteSocketId });

      // Stop screen sharing locally
      setIsScreenSharing(false);
      setScreenStream(null);

      // Get a new stream without screen sharing
      const newStream = await navigator.mediaDevices.getUserMedia(constrains);

      // Send the updated stream to the peer
      peer.sendStreams(newStream);
      setMyStream(newStream);
    } catch (error) {
      console.error("Error stopping screen share:", error);
    }
  };

  const handleLeaveCall = () => {
    if (myStream && myStream instanceof MediaStream) {
      myStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  
    setMyStream("");
    setRemoteStream("");
    setIsScreenSharing(false);
    setScreenStream(null);
  };
  

  
  const toggleVideo = async () => {
    if (typeof myStream !== 'string' && myStream) {
      myStream.getTracks().forEach((track) => {
        if (track.kind === 'video') {
          track.enabled = !track.enabled;
  
          const newStream = new MediaStream([...myStream.getTracks()]);
  
          peer.replacetracks(newStream);
  
          setIsVideoEnabled((prev) => !prev);
        }
      });
    }
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
        {/* {remoteSocketId && <button className=" text-white z-50" onClick={handleCallUser}>Call</button>} */}
        <div>
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
            style={{ transform: 'scaleX(-1)' }}
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
              if (video && myStream instanceof MediaStream) {
                video.srcObject = myStream;
              }
            }}
             style={{ transform: 'scaleX(-1)' }}
          />
        </div>
      </div>
      <div id="controls">
        {/* {myStream && <button onClick={sendStreams}>Send stream</button>} */}

        {myStream && (
          <div className="control-container" id="camera-btn">
             <span onClick={toggleVideo}>  {isVideoEnabled?<FaVideoSlash style={{ color: 'white' }}size={24}/>:<FaVideo style={{ color: 'white' }}size={24} />}</span>
          </div>
        )}

        <div className="control-container" id="mic-btn">
        <span >  <AiOutlineAudio style={{ color: 'white' }} size={24}/></span>
        </div>

        {remoteSocketId && (
          <div className="control-container" id="mic-invite">
          
            <span onClick={handleCallUser} >  <HiOutlineUserAdd style={{ color: 'white' }} size={24} /></span>
          </div>
        )}
        {/* {remoteSocketId && <button className=" text-white z-50" >Call</button>} */}

        <div className="control-container" id="screen-share-btn">
          {isScreenSharing ? (
            <LuScreenShareOff onClick={handleStopScreenShare} />
          ) : (
            // <button >Stop Screen Share</button>
            <div
              onClick={handleStartScreenShare}
              style={{ color: "white", cursor: "pointer" }}
            >
              <LuScreenShare size={24} />
            </div>
          )}
        </div>

        <Link to={`/feedback-page/${params.roomId}`}>
          <div
            className="control-container"
            id="leave-btn"
            onClick={handleLeaveCall}
          >
            <span><FaPhone style={{ color: 'white' }} size={24}/></span>
          </div>
        </Link>
      </div>
    </>

    //   </div>
    // </div>
  );
};

export default VideoCall;
