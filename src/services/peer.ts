class PeerService {
  peer: any;
  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      });
    }
  }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }

  async getAnswer(
    offer: RTCSessionDescriptionInit
  ): Promise<RTCSessionDescriptionInit | undefined> {
    if (this.peer) {
      await this.peer.setRemoteDescription(offer);
      const ans = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(ans));
      return ans;
    }
  }
  async sendStreams(stream: MediaStream): Promise<void> {
    for (const track of stream.getTracks()) {
      this.peer.addTrack(track, stream);
    }
  }

  async setLocalDescription(ans: RTCSessionDescriptionInit): Promise<void> {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
    }
  }

  async startScreenShare(myStream: MediaStream): Promise<MediaStream | undefined> {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true, // Include audio tracks if needed
      });
  
      // Replace existing tracks with the new screen sharing tracks
      this.replaceSTracks(myStream, screenStream);
  
      return screenStream;
    } catch (error) {
      console.error("Error starting screen share:", error);
      throw error;
    }
  }
  
  replaceSTracks(destinationStream: MediaStream, sourceStream: MediaStream): void {
    // Remove existing tracks from the destination stream
    destinationStream.getTracks().forEach((track) => {
      track.stop();
      destinationStream.removeTrack(track);
    });
  
    // Add the new tracks from the source stream to the destination stream
    sourceStream.getTracks().forEach((track) => {
      destinationStream.addTrack(track);
    });
  
    // Replace tracks in the peer connection
    this.peer.getSenders().forEach((sender: RTCRtpSender) => {
      if (sender.track && sender.track.kind === 'video') {
        this.peer.removeTrack(sender);
      }
    });
  
    sourceStream.getTracks().forEach((track) => {
      this.peer.addTrack(track, sourceStream);
    });
  }
  

  stopScreenShare(myStream: MediaStream, screenStream: any): void {
    console.log(screenStream);
    
    this.replaceTracks(myStream, myStream);
  }

  replaceTracks(
    destinationStream: MediaStream,
    sourceStream: MediaStream
  ): void {
    destinationStream.getTracks().forEach((track) => {
      track.stop();
      destinationStream.removeTrack(track);
    });

    sourceStream.getTracks().forEach((track) => {
      destinationStream.addTrack(track);
    });
  }
  
  replacetracks(newStream: MediaStream): void {
    this.peer.getSenders().forEach((sender:any) => {
      this.peer.removeTrack(sender);
    });
  
    newStream.getTracks().forEach((track) => {
      this.peer.addTrack(track, newStream);
    });
  }
  
  
}

export default new PeerService();
