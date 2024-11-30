import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import {
  getWord,
  updateCollocatesObj,
  updateForm,
  updateMeaning,
  updateMorphologicalInfo,
  clearSemanticInfoObj,
} from "../../redux/userSlice";

function InputField({
  text = false,
  label = "فارغ",
  multiLine = false,
  select = false,
  variant = "filled",
  type = "text",
  options = [],
  disabled = false,
  set,
  val,
  name,
  word = false,
  MorphologicalInfo = false,
  semantic_info = false,
  collocates_obj = false,
  meaning = false,
  defaultOption,
  dataOptions,
  setImage,
  image,
  onFocus,
}) {
  const [selectedOption, setSelectedOption] = useState(defaultOption || "");
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedOption(defaultOption);
  }, [defaultOption]);

  const handleTextChange = (event) => {
    const value = event.target.value;
    if (value.length > 0) {
      console.log("يلاااااااااااااااهوي");
      set?.(value);
    } else {
      Swal.fire({
        title: "يرجي تسجيل نطق الكلمة",
        confirmButtonText: "موافق", // Change the button text here
      });
    }

    if (MorphologicalInfo) dispatch(updateMorphologicalInfo({ name, value }));
    if (semantic_info) dispatch(clearSemanticInfoObj({ name, value }));
    if (collocates_obj) dispatch(updateCollocatesObj({ name, value }));
    if (meaning) dispatch(updateMeaning({ name, value, arr: null }));
    if (setImage) setImage({ ...image, [name]: value });
  };

  const handleSelectOptions = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    set?.(value);

    if (dataOptions?.length) {
      const option = dataOptions.find((opt) => opt.text === value);
      if (option) dispatch(getWord({ wordId: option._id }));
    }

    if (word) dispatch(updateForm({ name, value }));
    if (semantic_info) dispatch(clearSemanticInfoObj({ name, value }));
    if (MorphologicalInfo) dispatch(updateMorphologicalInfo({ name, value }));
  };

  const commonStyles = {
    width: "100%",
    fontSize: "1.4rem",
    background: "white",
    borderRadius: "5px",
    "& label": { color: "#757575", fontSize: "1.2rem" },
  };

  if (text) {
    return (
      <TextField
        label={label}
        variant={variant}
        type={type}
        disabled={disabled}
        onChange={handleTextChange}
        value={val || ""}
        onFocus={onFocus && onFocus}
        sx={{
          ...commonStyles,
          ...(variant === "filled" && {
            "& .MuiFilledInput-root:after": {
              borderBottomColor: "#255080",
              borderBottomWidth: "3px",
            },
            "& .MuiInputLabel-root.Mui-focused": { color: "#255080" },
          }),
          ...(variant === "outlined" && {
            "& .MuiOutlinedInput-root fieldset": { borderColor: "#E0E3E7" },
            "& .MuiOutlinedInput-root:hover fieldset": {
              borderColor: "#255080",
              borderWidth: "2px",
            },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: "#255080",
            },
          }),
        }}
      />
    );
  }

  if (multiLine) {
    return (
      <TextField
        label={label}
        multiline
        rows={6}
        variant={variant}
        onChange={handleTextChange}
        value={val || ""}
        sx={{
          ...commonStyles,
          "& .MuiFilledInput-root:after": {
            borderBottomColor: "#255080",
            borderBottomWidth: "3px",
          },
          "& .MuiInputLabel-root.Mui-focused": { color: "#255080" },
        }}
      />
    );
  }

  if (select) {
    return (
      <FormControl variant={variant} sx={{ ...commonStyles, minWidth: 120 }}>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          value={selectedOption}
          onChange={handleSelectOptions}
        >
          <MenuItem value="">
            <em>اختر</em>
          </MenuItem>
          {options.map((option, i) => (
            <MenuItem value={option} key={i}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return null;
}

export default InputField;
