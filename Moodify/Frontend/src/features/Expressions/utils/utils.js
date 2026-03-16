import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";

let faceLandmarker;

export async function init(videoRef) {

  const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm");
  
  faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      },
      runningMode: "VIDEO",
      numFaces: 1,
      outputFaceBlendshapes: true,
    });
    const startCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        const video = videoRef.current;
        video.srcObject = stream;

        video.onloadedmetadata = () => {
            video.play();
            // detectFace();   // start detection ONLY after video loads
        };
    };
  
    startCamera();
}

export async function detectFaceEmotion(videoRef,setEmotion) {
  
  const video = videoRef.current;

      const predict = () => {

        if (!video || video.readyState !== 4) {
            requestAnimationFrame(predict);
            return;
        }

        const results = faceLandmarker.detectForVideo(
            video,
            performance.now()
        );

        if (results.faceBlendshapes.length > 0) {

          const blendShapes = results.faceBlendshapes[0].categories;

          const getScore = (name) =>
            blendShapes.find((s) => s.categoryName === name)?.score || 0;

          const smileLeft = getScore("mouthSmileLeft");
          const smileRight = getScore("mouthSmileRight");

          const frownLeft = getScore("mouthFrownLeft");
          const frownRight = getScore("mouthFrownRight");

          const jawOpen = getScore("jawOpen");
          const eyeWideLeft = getScore("eyeWideLeft");
          const eyeWideRight = getScore("eyeWideRight");

          // 😊 Happy
          if (smileLeft > 0.6 && smileRight > 0.6) {
            setEmotion("😊 Happy");
          }

          // 😢 Sad
          else if (frownLeft > 0.001 && frownRight > 0.001){
            setEmotion("😢 Sad");
          }

          // 😲 Surprise
          else if (jawOpen > 0.6 && eyeWideLeft > 0.1 && eyeWideRight > 0.1) {
            setEmotion("😲 Surprise");
          }

          else {
            setEmotion("😐 Neutral");
          }
        }

      };

      predict();
  
}