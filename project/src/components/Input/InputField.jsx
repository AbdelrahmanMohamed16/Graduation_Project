import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateForm, updateMorphologicalInfo } from "../../redux/userSlice";

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
  diacritics = false,
}) {
  const [option, setOption] = useState("");
  const styled = option ? "none" : "block";
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if (val) {
      val(event.target.value);
    }
    if (word) {
      dispatch(updateForm({ name, value: event.target.value }));
    }
    if (semantic_info) {
    }
    if (MorphologicalInfo) {
      dispatch(updateMorphologicalInfo({ name, value: event.target.value }));
    }
    if (diacritics) {
    }
  };
  const handleInputChange = (event) => {
    console.log(event.target.value);
    if (set) {
      set(event.target.value);
    }
    if (MorphologicalInfo) {
      dispatch(updateMorphologicalInfo({ name, value: event.target.value }));
    }
    if (semantic_info) {
    }
    if (diacritics) {
    }
  };
  if (text) {
    return (
      <TextField
        label={label}
        // helperText="هذا نص مساعد"
        variant={variant}
        type={type}
        disabled={disabled ? disabled : null}
        onChange={handleInputChange}
        value={val}
        sx={{
          width: "100%",
          ...(variant === "filled"
            ? {
                "& .MuiFilledInput-root": {
                  "&:after": {
                    borderBottomColor: "#255080",
                    borderBottomWidth: "3px",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#255080",
                  },
                },
                background: "white",
                borderRadius: "5px",
              }
            : variant === "outlined" && {
                "& label": {
                  color: "#1976d2",
                },
                "& label.Mui-focused": {
                  color: "#1976d2",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#B2BAC2",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#E0E3E7",
                  },
                  "&:hover fieldset": {
                    borderWidth: "2px",
                    borderColor: "#255080",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#255080",
                  },
                },
                background: "white",
                borderRadius: "5px",
              }),
        }}
      />
    );
  } else if (multiLine) {
    return (
      <TextField
        id="filled-textarea"
        label={label}
        multiline
        rows={6}
        variant={variant}
        onChange={handleInputChange}
        value={val}
        sx={{
          width: "100%",
          "& .MuiFilledInput-root": {
            "&:after": {
              borderBottomColor: "#255080",
              borderBottomWidth: "3px",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#255080",
            },
          },
          background: "white",
          borderRadius: "5px",
        }}
      />
    );
  } else if (select) {
    return (
      <FormControl
        variant={variant}
        onChange={handleInputChange}
        value={val}
        sx={{
          width: "100%",
          minWidth: 120,
          "& .MuiInputBase-root": {
            "& ::before": {
              border: "0px",
            },
          },
          "& .MuiSelect-select": {
            textAlign: "start",
          },
          background: "white",
          borderRadius: "5px",
        }}
      >
        <InputLabel id="select-filled-label">{label}</InputLabel>
        <Select
          labelId="select-filled-label"
          id="select-filled"
          value={selectedOption}
          onChange={handleChange}
          color="white"
          // sx={{
          //   width: "350px",
          //   "& .MuiFilledInput-root": {
          //     "& .label": {
          //       color: "#255080",
          //       border: "1px solid red",
          //     },
          //   },
          // }}
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
}

export default InputField;
