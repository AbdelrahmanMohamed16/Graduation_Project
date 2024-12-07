import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Stack } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteDiacriticExample } from "../../redux/userSlice";
import Swal from "sweetalert2";

const Voice = ({ setVoice, addRecord, index, initialURL, deleteRecord }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(initialURL || null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialURL) {
      setAudioURL(initialURL);
    }
  }, [initialURL]);

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

      if (index !== undefined) addRecord(audioFile, index);
      else addRecord(audioFile);

      const newAudioURL = URL.createObjectURL(audioBlob);
      setAudioURL(newAudioURL);
      setVoice(newAudioURL);
    };

    mediaRecorderRef.current.start();
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className="no-print">
      {" "}
      <Stack flexDirection={"row"}>
        <Button
          variant="contained"
          sx={{
            background: "linear-gradient(to right, #0F2D4D, #2369B3)",
            borderRadius: "5px",
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
          {isRecording ? "انهاء" : audioURL ? "اعادة التسجيل" : "النطق"}
        </Button>

        {audioURL && (
          <Button
            variant="outlined"
            sx={{
              borderRadius: "5px",
              color: "black",
              fontSize: "16px",
              fontFamily: "El Messiri",
              borderColor: "#2369B3",
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
        {index ? (
          <Button
            variant="contained"
            size="large"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => {
              Swal.fire({
                title: "هل أنت متأكد؟",
                text: "لن يمكنك الرجوع عن هذا الأمر",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم",
                cancelButtonText: "لا",
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(deleteDiacriticExample({ index }));
                  deleteRecord(index);
                }
              });
            }}
            sx={{ marginLeft: 2 }}
          >
            حذف المثال
          </Button>
        ) : (
          <></>
        )}
      </Stack>
    </div>
  );
};

export default Voice;
