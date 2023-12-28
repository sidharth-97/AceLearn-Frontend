import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import { useEffect, } from "react";

const RoomPage = () => {
  const { roomId } = useParams();

  useEffect(() => {
    const myMeeting = async () => {
      const appID = parseInt(import.meta.env.VITE_APPID);
      const serverSecret = `${import.meta.env.VITE_SERVERSECRET}`;
      console.log(appID, serverSecret);

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId as string,
        Date.now().toString(),
        Date.now().toString()
      );

      const newZp = ZegoUIKitPrebuilt.create(kitToken);
      console.log(newZp, "this is the zp ++++++++++++++++++++++++++++++");

      newZp.joinRoom({
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
        },
      });
    };

    myMeeting();

    
  }, [roomId]);

  const handleClick = () => {
    window.location.href = "/";
  };

  return (
    <div>
      { (
        <div className="absolute font-semibold text-xl ps-1 cursor-pointer" style={{ zIndex: "101",color:"#242736" }} onClick={handleClick}>
          Leave
        </div>
      )}
      <div className="myCallContainer" style={{ width: "100vw", height: "100vh" }}></div>
    </div>
  );
};

export default RoomPage;
