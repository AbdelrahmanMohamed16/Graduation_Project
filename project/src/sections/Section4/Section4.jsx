import React, { useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import InputField from "../../components/Input/InputField";
import Box from "@mui/material/Box";
import ButtonCompnent from "../../components/Button/ButtonCompnent";
import { Stack, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ExampleData from "../Section3";

function Section4() {
  const [components, setComponents] = useState([]);
  const [collocations, setCollocations] = useState([]);
  const [isRichTextEnabled, setIsRichTextEnabled] = useState(false);
  const [examplesText, setExamplesText] = useState("");
  const quillRef = useRef(null);

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const toggleRichText = () => {
    if (isRichTextEnabled && quillRef.current) {
      setExamplesText(stripHtml(examplesText));
    }
    setIsRichTextEnabled(!isRichTextEnabled);
  };

  const handelExample = () => {
    setComponents([...components, <ExampleData key={components.length} />]);
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "30px", mt: 15 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" fontFamily="El Messiri" color="#0F2D4D">
            المتصاحبات اللفظية:
          </Typography>
          <Stack>
            {collocations.map((collocation, index) => (
              <div key={index} style={{ cursor: "pointer", fontWeight: "600", fontSize: "18px", marginBottom: "15px" }}>
                {collocation}
              </div>
            ))}
          </Stack>
        </Grid>

        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} md={4}>
            <InputField text={true} label="التركيب التصاحبي" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InputField text={true} label="معني التركيب التصاحبي" />
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: "center" }}>
            <ButtonCompnent text="أضف متصاحبة جديدة" rounded={true} icon={true} sx={{ width: "100%" }} />
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
                border: "1px solid #e0e0e0",
              }}
            >
              {isRichTextEnabled ? (
                <ReactQuill
                  ref={quillRef}
                  value={examplesText}
                  onChange={setExamplesText}
                  modules={{ toolbar: [["bold"], [{ color: [] }]] }}
                  style={{ height: "200px" }}
                />
              ) : (
                <InputField
                  text={true}
                  label="أمثلة إستعمالية"
                  val={examplesText}
                  set={setExamplesText}
                />
              )}
            </Box>

            {/* Toggle button positioned below the editor */}
            <Typography
              onClick={toggleRichText}
              sx={{
                fontSize: "14px",
                color: "#1a73e8",
                cursor: "pointer",
                mt: 1,
                padding: "8px 12px",
                borderRadius: "4px",
                transition: "background-color 0.3s, color 0.3s",
                display: "inline-block",
                "&:hover": {
                  backgroundColor: "#e0f3ff",
                  color: "#1a73e8",
                },
                position: "relative",
                zIndex: 10,
              }}
            >
              {isRichTextEnabled ? "التبديل إلى نص عادي" : "تمكين التنسيق"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <InputField text={true} label="المصدر" />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            {components.map((component, index) => (
              <div key={index} style={{ marginTop: 15 }}>
                {component}
              </div>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Section4;
