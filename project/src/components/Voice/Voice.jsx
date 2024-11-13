import React, { useState, useRef } from "react";
import { Button, IconButton, Stack } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Voice = ({ setVoice, addRecord, index }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleStartRecording = async () => {
    setIsRecording(true);
    audioChunksRef.current = [];

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const audioFile = new File([audioBlob], `recording_${Date.now()}.wav`, {
        type: "audio/wav",
      });
      console.log("index: ", index);
      if (index !== undefined) addRecord(audioFile, index);
      else addRecord(audioFile);
      const audioURL = URL.createObjectURL(audioBlob);
      setAudioURL(audioURL);
      setVoice(audioURL);
    };

    mediaRecorderRef.current.start();
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <Stack flexDirection={"row"}>
      <div className="no-print">
        {" "}
        <Button
          variant="contained"
          sx={{
            background: "linear-gradient(to right, #0F2D4D, #2369B3)",
            borderRadius: "5px",
            // padding: "1rem",
            width: "130px",
            marginRight: "10px",
            color: "#FFFFFF",
            fontSize: "20px",
            fontFamily: "El Messiri",
          }}
          size="large"
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          endIcon={
            isRecording ? (
              <StopIcon sx={{ color: "#E72929" }} />
            ) : (
              <MicIcon sx={{ color: "white" }} />
            )
          }
        >
          {isRecording ? (
            <span style={{ fontSize: "20px" }}>انهاء</span>
          ) : (
            <span style={{ fontSize: "20px" }}>النطق</span>
          )}
          {/* {isRecording ? (
          <StopIcon sx={{ color: "#E72929", fontSize: "30px" }} />
        ) : (
          <MicIcon sx={{ color: "white", fontSize: "30px" }} />
        )} */}
        </Button>
      </div>

      {audioURL && (
        <Button
          variant="outlined"
          sx={{
            borderRadius: "5px",
            color: "white", // Text color
            fontSize: "16px",
            fontFamily: "El Messiri",
            borderColor: "#2369B3", // Border color
            borderWidth: "2px",
          }}
          onClick={() => new Audio(audioURL).play()}
        >
          <span
            style={{ color: "black", fontSize: "20px", marginLeft: "15px" }}
          >
            استمع
          </span>
          <PlayArrowIcon sx={{ color: "black", fontSize: "30px" }} />
        </Button>
      )}
    </Stack>
  );
};

export default Voice;
