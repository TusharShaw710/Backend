import React, { useEffect, useRef, useState } from "react";
import { init,detectFaceEmotion } from "../utils/utils";
import "../styles/faceExp.scss"

export default function FaceExpression() {

  const videoRef = useRef(null);
  const [emotion, setEmotion] = useState("Neutral");
  let detectFace=useRef(null);

  useEffect(() => {
    detectFace.current = ()=>{
      detectFaceEmotion(videoRef,setEmotion);
    };

    init(videoRef);
    
  },[]);

  return (
    <div className="window" style={{ textAlign: "center" }}>

      <h2>Face Expression Detection</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "420px",
          borderRadius: "10px",
          border: "3px solid black"
        }}
      />

      <button onClick={()=>{
        detectFace.current();
      }} className="primary-btn">{emotion}</button>

    </div>
  );
}