import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

function InputField({
  text = false,
  label = "فارغ",
  multiLine = false,
  select = false,
  variant = "filled",
  type = "text",
  options = [],
  disabled = false,
}) {
  const [option, setOption] = useState("");
  const styled = option ? "none" : "block";
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  if (text) {
    return (
      // <TextField
      //   id="filled-basic"
      //   label={text}
      //   variant="outlined"
      //   InputLabelProps={{
      //     sx: {
      //       right: "25px", // Align label to the right
      //       textAlign: "right", // Align label text to the right
      //       transformOrigin: "top right", // Set the origin for label animation
      //       "&.Mui-focused, &.MuiFormLabel-filled": {
      //         transform: "translate(8px, 3px) scale(0.95)", // Adjust pop-up animation
      //       },
      //       color: "gray", // Default label color
      //       "&.Mui-focused": {
      //         color: "#255080",
      //         fontSize: "16px",
      //       },
      //     },
      //   }}
      //   sx={{
      //     "& .MuiFilledInput-root": {
      //       "&:after": {
      //         borderBottomColor: "#255080",
      //         borderBottomWidth: "3px",
      //       },
      //       "& .MuiInputLabel-root.Mui-focused": {
      //         color: "#255080",
      //       },
      //     },
      //   }}
      // />
      <TextField
        label={label}
        // helperText="هذا نص مساعد"
        variant={variant}
        type={type}
        disabled={disabled ? disabled : null}
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
      // <TextField
      //   id="filled-textarea"
      //   label={text}
      //   multiline
      //   variant="filled"
      //   rows={6}
      //   maxRows={6}
      //   InputLabelProps={{
      //     sx: {
      //       right: "25px", // Align label to the right
      //       textAlign: "right", // Align label text to the right
      //       transformOrigin: "top right", // Set the origin for label animation
      //       "&.Mui-focused, &.MuiFormLabel-filled": {
      //         transform: "translate(8px, 3px) scale(0.95)", // Adjust pop-up animation
      //       },
      //       color: "gray", // Default label color
      //       "&.Mui-focused": {
      //         color: "#255080",
      //         fontSize: "16px",
      //       },
      //     },
      //   }}
      //   sx={{
      //     width: "350px",
      //     "& .MuiFilledInput-root": {
      //       "&:after": {
      //         borderBottomColor: "#255080",
      //         borderBottomWidth: "3px",
      //       },
      //       "& .MuiInputLabel-root.Mui-focused": {
      //         color: "#255080",
      //       },
      //     },
      //   }}
      // />
      <TextField
        id="filled-textarea"
        label={label}
        multiline
        rows={6}
        variant={variant}
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
      // <FormControl
      //   variant="filled"
      //   style={{ marginTop: 0 }}
      //   sx={{
      //     "& .MuiFilledInput-root": {
      //       "&:after": {
      //         borderBottomColor: "#255080",
      //         borderBottomWidth: "3px",
      //       },
      //       right: 0,
      //     },
      //     "& .MuiSelect-icon": {
      //       left: 0, // Moves the arrow to the left
      //       right: "unset", // Unsets the default right position
      //     },
      //     m: 1,
      //     minWidth: 150,
      //   }}
      // >
      //   <InputLabel
      //     id="demo-simple-select-filled-label"
      //     sx={{
      //       textAlign: "right", // Align label text to the right
      //       transformOrigin: "top right", // Set the origin for label animation
      //       right: "40px",
      //       fontSize: "16px",
      //       textAlign: "right", // Aligns text to the left (start)
      //       direction: "rtl", // Ensures LTR layout for proper alignment
      //       "&.Mui-focused, &.MuiFormLabel-filled": {
      //         transform: "translate(8px, 3px) scale(0.95)", // Adjust pop-up animation
      //       },
      //       "&.Mui-focused": {
      //         color: "#255080",
      //         fontSize: "12px",
      //       },
      //     }}
      //     style={{ display: styled }}
      //   >
      //     اختار
      //   </InputLabel>
      //   <Select
      //     labelId="demo-simple-select-filled-label"
      //     id="demo-simple-select-filled"
      //   >
      //     {options.map((option) => {
      //       <MenuItem value={option}>{option}</MenuItem>;
      //     })}
      //   </Select>
      // </FormControl>

      <FormControl
        variant={variant}
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
