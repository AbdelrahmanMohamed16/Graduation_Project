import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWord,
  updateCollocates_obj,
  updateForm,
  updateImage_obj,
  updateMeaning,
  updateMorphologicalInfo,
  updateSemantic_info_obj,
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
  diacritics = false,
  collocates_obj = false,
  meaning = false,
  defaultOption,
  setWord,
  dataOptions,
  setImage,
  image,
}) {
  const [option, setOption] = useState("");
  const styled = option ? "none" : "block";
  const image_obj = useSelector((state) => state.user.image_obj);
  const [selectedOption, setSelectedOption] = useState(defaultOption || "");
  useEffect(() => {
    setSelectedOption(defaultOption);
  }, [defaultOption]);

  const dispatch = useDispatch();
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if (set) {
      if (dataOptions.length) {
        const option = dataOptions.filter(
          (option) => option.text === event.target.value
        );
        console.log(dataOptions);
        if (option.length > 0) {
          const [fristElement] = option;
          console.log(fristElement._id);
          dispatch(getWord({ wordId: fristElement._id }));
        }
      }
      set(event.target.value);
    }
    if (word) {
      dispatch(updateForm({ name, value: event.target.value }));
    }
    if (semantic_info) {
      dispatch(updateSemantic_info_obj({ name, value: event.target.value }));
    }
    if (MorphologicalInfo) {
      if (set) {
        set(event.target.value);
      }
      dispatch(updateMorphologicalInfo({ name, value: event.target.value }));
    }
    if (diacritics) {
    }
  };
  const handleInputChange = (event) => {
    if (set) {
      set(event.target.value);
    }

    if (MorphologicalInfo) {
      dispatch(updateMorphologicalInfo({ name, value: event.target.value }));
    }
    if (semantic_info) {
      dispatch(updateSemantic_info_obj({ name, value: event.target.value }));
    }
    if (diacritics) {
    }
    if (collocates_obj) {
      dispatch(updateCollocates_obj({ name, value: event.target.value }));
    }
    if (meaning) {
      dispatch(updateMeaning({ name, value: event.target.value }));
    }
    if (setImage) {
      console.log("image: ", image);
      console.log("name: ", name);
      console.log("value: ", event.target.value);
      setImage({ ...image, [name]: event.target.value });
      // dispatch(updateImage_obj({ name, value: event.target.value }));
      // console.log(image_obj);
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
          fontSize: "2px", // Adjust the label font size here

          ...(variant === "filled"
            ? {
                "& label": {
                  color: "#757575",
                  fontSize: "1.2rem", // Adjust the label font size here
                },
                "& .MuiFilledInput-root": {
                  "&:after": {
                    borderBottomColor: "#255080",
                    borderBottomWidth: "3px",
                  },
                  "& .MuiInputLabel-root": {},
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#255080",
                  },
                },
                "& .MuiInputBase-input": {
                  fontSize: "1.4rem", // Adjust the input text size here
                },
                background: "white",
                borderRadius: "5px",
              }
            : variant === "outlined" && {
                "& label": {
                  color: "#757575",
                  fontSize: "1.2rem", // Adjust the label font size here
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
                  "& .MuiInputBase-input": {
                    fontSize: "1.4rem", // Adjust the input text size here
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
          "& label": {
            color: "#757575",
            fontSize: "1.2rem", // Adjust the label font size here
          },
          "& .MuiFilledInput-root": {
            "&:after": {
              borderBottomColor: "#255080",
              borderBottomWidth: "3px",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#255080",
            },
          },
          "& .MuiInputBase-input": {
            fontSize: "1.4rem", // Adjust the input text size here
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
        sx={{
          width: "100%",
          minWidth: 120,
          "& label": {
            color: "#757575",
            fontSize: "1.2rem", // Adjust the label font size here
          },
          "& .MuiInputBase-root": {
            "& ::before": {
              border: "0px",
            },
          },
          "& .MuiSelect-select": {
            textAlign: "start",
          },
          "& .MuiInputBase-input": {
            fontSize: "1.4rem", // Adjust the input text size here
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
