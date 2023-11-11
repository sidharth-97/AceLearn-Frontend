import React, { useCallback, useEffect,useState } from 'react';
import socket from '../../services/socket';
import ReactPlayer from 'react-player';

type UserData = {
  tutor: string;
  id: string;
};

const VideoCall: React.FC = () => {
    const [remoteSocketId, setremoteSocketId] = useState(null)
    const [myStream,setMyStream]=useState("")
    
  const handleUserJoined = useCallback(
    ({ tutor, id }: UserData) => {
          console.log(tutor, id);
          setremoteSocketId(id as any)
    },
    [],
    );
    
    const handleCallUser = useCallback(async() => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video:true
        })
        setMyStream(stream as any)

    },[])

  useEffect(() => {
    socket.on('user:joined', handleUserJoined);

    return () => {
      // Cleanup: remove the event listener when the component unmounts
      socket.off('user:joined', handleUserJoined);
    };
  }, [socket,handleUserJoined]);

  return (
    <div>
      <h1>Video Call Room</h1>
          {/* Your video call content goes here */}
          <h5>{remoteSocketId ? "Connected" : "No one in the room"}</h5>
          {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
          <div>
              <h1>My Stream</h1>
          {
              myStream && <ReactPlayer playing muted height={"300px"} width={"600px"} url={myStream}/>
          }
       </div>
    </div>
  );
};

export default VideoCall;
