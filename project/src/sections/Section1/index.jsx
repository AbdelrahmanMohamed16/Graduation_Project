import { Grid2, Typography, Button } from "@mui/material";
import React, { useState, useRef, useCallback, Fragment } from "react";
import InputField from "../../components/Input/InputField";
import Voice from "../../components/Voice/Voice";
import ButtonCompnent from "../../components/Button/ButtonCompnent";

// Phonetic Keyboard Component
const PhoneticKeyboard = ({ onKeyPress }) => {
  const ipaCharacters = [
    "ʌ", "æ", "θ", "ð", "ʃ", "ʒ", "ŋ", "ʧ", "ʤ", "ɪ", "ɛ", "ɔ", "ʊ", "ʌ", "ɛ", "ɑ", "ɔ", "ɒ", "ʍ", "ɾ", "ɹ", "j", "w", "p", "b", "t", "d", "k", "g"
  ];

  return (
    <Grid2 container spacing={1} justifyContent="center" mt={2}>
      {ipaCharacters.map((char, index) => (
        <Grid2 item key={index}>
          <Button
            variant="outlined"
            sx={{ padding: "10px", fontSize: "18px", fontFamily: "El Messiri" }}
            onClick={() => onKeyPress(char)}
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
  const [inputValue, setInputValue] = useState(""); // Local state for input value
  const inputRef = useRef(null); // Ref for managing input focus

  const handleKeyPress = useCallback((key) => {
    setInputValue((prevValue) => prevValue + key); // Update the input value
  }, []);

  // Ensure input stays focused after each key press
  React.useEffect(() => {
    inputRef.current?.focus();
  }, [inputValue]);

  return (
    <Grid2 container size={12} rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
      <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <InputField label="الضبط التام بالشكل" text={true} />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        {/* The input field where phonetic characters will be typed */}
        <InputField
          label="الكتابة الصوتية"
          text={true}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // Updates input field text
          inputRef={inputRef} // Reference for keeping focus
          multiline
          rows={4}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <Voice />
      </Grid2>
      {/* Phonetic Keyboard */}
      <Grid2 size={12}>
        <PhoneticKeyboard onKeyPress={handleKeyPress} />
      </Grid2>
    </Grid2>
  );
};

// Section1 Component
export default function Section1({ word = "المدخل" }) {
  const [examples, setExamples] = useState([<DataInputs />]);

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
        {examples.map((example, i) => (
          <Fragment key={i}>{example}</Fragment>
        ))}
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ButtonCompnent
            text="اضف مثال جديد"
            icon={true}
            onclick={() =>
              setExamples((prevFields) => [...prevFields, <DataInputs />])
            }
          />
        </Grid2>
      </Grid2>
    </div>
  );
}
