import { Grid2, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import InputField from "../../components/Input/InputField";
import Voice from "../../components/Voice/Voice";
import ButtonCompnent from "../../components/Button/ButtonCompnent";

const PhoneticKeyboard = () => {
  const ipaCharacters = [
    "ʌ", "æ", "θ", "ð", "ʃ", "ʒ", "ŋ", "ʧ", "ʤ", "ɪ", "ɛ", "ɔ", "ʊ", "ʌ", "ɛ", "ɑ", "ɔ", "ɒ", "ʍ", "ɾ", "ɹ", "j", "w", "p", "b", "t", "d", "k", "g"
  ];

  // Inject character into focused input field
  const handleKeyPress = (char) => {
    const activeElement = document.activeElement; // Get the currently focused element

    if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;

      // Insert the character at the current caret position
      const newValue = activeElement.value.slice(0, start) + char + activeElement.value.slice(end);
      activeElement.value = newValue; // Set the new value
      activeElement.setSelectionRange(start + 1, start + 1); // Move caret
      activeElement.focus(); // Keep focus on the input
    }
  };

  return (
    <Grid2 container spacing={1} justifyContent="center" mt={2}>
      {ipaCharacters.map((char, index) => (
        <Grid2 item key={index}>
          <Button
            variant="outlined"
            sx={{ padding: "10px", fontSize: "18px", fontFamily: "El Messiri" }}
            onMouseDown={(e) => {
              e.preventDefault(); // Prevent focus loss
              handleKeyPress(char);
            }}
          >
            {char}
          </Button>
        </Grid2>
      ))}
    </Grid2>
  );
};

// DataInputs Component
const DataInputs = () => {
  return (
    <Grid2 container size={12} rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
      <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <InputField label="الضبط التام بالشكل" text={true} />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <InputField
          label="الكتابة الصوتية"
          text={true}
          multiline
          rows={4}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <Voice />
      </Grid2>
    </Grid2>
  );
};

// Main Component
export default function Section1({ word = "المدخل" }) {
  const [examples, setExamples] = useState([<DataInputs key={0} />]);

  // Add a new DataInputs component
  const addNewExample = () => {
    setExamples((prev) => [...prev, <DataInputs key={prev.length} />]);
  };

  return (
    <div id="section1">
      <Typography
        variant="h4"
        fontWeight={"bold"}
        fontFamily={"El Messiri"}
        color="#0F2D4D"
        mb={3}
      >
        مستويات التحرير:
      </Typography>
      <Grid2 container mt={2} rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
        <Grid2 size={{ xs: 8, sm: 4, md: 3 }}>
          <InputField label={word} text={true} disabled={true} />
        </Grid2>
        <Grid2 size={12}>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            fontFamily={"El Messiri"}
            color="#0F2D4D"
          >
            المعلومات الصوتية:
          </Typography>
        </Grid2>
        {examples}
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ButtonCompnent
            text="اضف مثال جديد"
            icon={true}
            onclick={addNewExample}
          />
        </Grid2>
        {/* Single Phonetic Keyboard rendered once and shared */}
        <Grid2 size={12}>
          <PhoneticKeyboard />
        </Grid2>
      </Grid2>
    </div>
  );
}
