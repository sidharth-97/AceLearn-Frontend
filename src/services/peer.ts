class PeerService{
    constructor() {
        if (!this.peer) {
            this.peer = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: [
                            "stun:stun.l.google.com:19302",
                            "stun:global.stun.twilio.com:3478"
                        ]
                    }
                ]
            })
        }
    }

    async getOffer() {
        if (this.peer) {
            const offer = await this.peer.createOffer();
            await this.peer.setLocalDescription(new RTCSessionDescription(offer))
            return offer
        }
    }

    async getAnswer(offer) {
        if (this.peer) {
            await this.peer.setRemoteDescription(offer)
            const ans = await this.peer.createAnswer()
            await this.peer.setLocalDescription(new RTCSessionDescription(ans))
            return ans
        }
    }
    async sendStreams(stream) {
  for (const track of stream.getTracks()) {
    this.peer.addTrack(track, stream);
  }
}


    async setLocalDescription(ans) {
        if (this.peer) {
          await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
        }
    }
    
    async startScreenShare(myStream) {
        try {
          const screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
          });
    
          // Replace the tracks in myStream with the screenStream tracks
          this.replaceTracks(myStream, screenStream);
    
          return screenStream;
        } catch (error) {
          console.error('Error starting screen share:', error);
          throw error;
        }
      }
    
      stopScreenShare(myStream, screenStream) {
        // Replace the tracks in myStream with the original myStream tracks
        this.replaceTracks(myStream, myStream);
      }
    
      replaceTracks(destinationStream, sourceStream) {
        // Remove existing tracks from destinationStream
        destinationStream.getTracks().forEach((track) => {
          track.stop();
          destinationStream.removeTrack(track);
        });
    
        // Add new tracks from sourceStream to destinationStream
        sourceStream.getTracks().forEach((track) => {
          destinationStream.addTrack(track);
        });
      }
}

export default new PeerService()