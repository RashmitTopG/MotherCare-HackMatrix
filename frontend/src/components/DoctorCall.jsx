import React, { useEffect, useState, useRef } from "react";
import Peer from "peerjs";
import { Button } from "@/components/ui/button";

const DoctorCall = () => {
  const [peerId, setPeerId] = useState("");
  const videoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peer, setPeer] = useState(null);
  const [call, setCall] = useState(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const newPeer = new Peer();
    newPeer.on("open", async (id) => {
      setPeerId(id);
      await fetch("http://localhost:3000/call/setDoctorPeerId", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ peerId: id }),
      });
    });

    newPeer.on("call", (incomingCall) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        videoRef.current.srcObject = stream;
        incomingCall.answer(stream);
        incomingCall.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
        });
        setCall(incomingCall);
      });
    });

    setPeer(newPeer);
    return () => newPeer.destroy();
  }, []);

  const endCall = () => {
    if (call) call.close();
    if (stream) stream.getTracks().forEach((track) => track.stop());
    videoRef.current.srcObject = null;
    remoteVideoRef.current.srcObject = null;
  };

  const shareScreen = () => {
    navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then((screenStream) => {
      const videoTrack = screenStream.getVideoTracks()[0];
      if (call) {
        const sender = call.peerConnection.getSenders().find((s) => s.track.kind === "video");
        sender.replaceTrack(videoTrack);
        videoTrack.onended = () => {
          navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            const videoTrack = stream.getVideoTracks()[0];
            sender.replaceTrack(videoTrack);
          });
        };
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-center bg-pink-50 shadow-lg rounded-2xl mt-12"> {/* Added mt-12 here */}
      <h2 className="text-3xl font-bold text-pink-600 mb-4">Doctor Video Call</h2>
      <p className="text-gray-700">Doctor's Peer ID: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{peerId}</span></p>
      <div className="flex justify-center gap-4 mt-4">
        <Button onClick={() => navigator.clipboard.writeText(peerId)} className="bg-pink-500 hover:bg-pink-600">Copy ID</Button>
        <Button onClick={endCall} className="bg-red-500 hover:bg-red-600">End Call</Button>
        <Button onClick={shareScreen} className="bg-blue-500 hover:bg-blue-600">Share Screen</Button>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="text-lg font-semibold text-pink-700">My Video</h3>
          <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg shadow-md" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-pink-700">Patient's Video</h3>
          <video ref={remoteVideoRef} autoPlay playsInline className="w-full rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default DoctorCall;