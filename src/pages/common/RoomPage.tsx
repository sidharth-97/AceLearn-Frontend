import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";

const RoomPage = () => {
  const { roomId } = useParams();
  const myMeeting = async () => {
    const appID =parseInt(import.meta.env.VITE_APPID);
      const serverSecret = `${import.meta.env.VITE_SERVERSECRET}`;
      console.log(appID,serverSecret);
      
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId as string,
      Date.now().toString(),
      Date.now().toString()
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
      },
    });
  };
  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
};

export default RoomPage;
