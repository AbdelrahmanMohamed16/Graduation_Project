import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import InputField from "../../components/Input/InputField";
import ButtonCompnent from "../../components/Button/ButtonCompnent";
import Grid2 from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataWithState, updateForm } from "../../redux/userSlice";

const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme }) => ({
  variants: [
    {
      props: { checked: true },
      style: {
        ".MuiFormControlLabel-label": {
          color: "black",
        },
      },
    },
  ],
}));

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();
  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {
  value: PropTypes.any,
};

function LastSection({ files, records, totalTimeSpent }) {
  const dispatch = useDispatch();
  const diacritic = useSelector((state) => state.user.diacritics);
  const morphological = useSelector((state) => state.user.morphological_info);
  const semantic = useSelector((state) => state.user.semantic_info);

  const sendImages = async () => {
    let imageFormData = new FormData();
    imageFormData.append("img", files[0]);
    try {
      const imageURL = await fetch("http://156.196.36.161:5001/api/v1/upload/image", {
        method: "POST",
        body: imageFormData,
      });
      console.log(imageURL);
    } catch (e) {
      console.log(e);
    }
  };

  const sendRecord = async () => {
    let recordFormData = new FormData();
    recordFormData.append("record", records[0]);
    try {
      const recordURL = await fetch("http://156.196.36.161:5001/api/v1/upload/record", {
        method: "POST",
        body: recordFormData,
      });
      console.log(recordURL);
    } catch (e) {
      console.log(e);
    }
  };

  const submitPublics = () => {
    // sendImages();
    // sendRecord();
    dispatch(updateForm({ name: "diacritics", value: diacritic }));
    dispatch(updateForm({ name: "semantic_info", value: semantic }));
    dispatch(updateForm({ name: "morphological_info", value: morphological }));
    dispatch(fetchDataWithState());
  };

  const formatTime = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours} ساعات ${minutes} دقائق`;
    } else if (minutes > 0) {
      return `${minutes} دقائق`;
    } else {
      return `0 دقائق`;
    }
  };

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Typography variant="h6" fontWeight={"bold"} fontFamily={"El Messiri"} color="#0F2D4D">
          حالة البطاقة:
        </Typography>
      </Grid2>

      <Grid2 size={12} ml={2}>
        <RadioGroup
          name="use-radio-group"
          defaultValue="first"
          sx={{ width: "fit-content", direction: "rtl", marginTop: 0 }}
        >
          <MyFormControlLabel value="first" label="مكتمل" control={<Radio />} />
          <MyFormControlLabel value="second" label="ناقص" control={<Radio />} />
        </RadioGroup>
      </Grid2>

      <Grid2 size={12}>
        <Typography variant="h6" fontWeight={"bold"} fontFamily={"El Messiri"} color="#0F2D4D">
          المسار:
        </Typography>
      </Grid2>

      <Grid2 size={12} ml={2}>
        <RadioGroup
          name="use-radio-group"
          defaultValue="first"
          sx={{ width: "fit-content", direction: "rtl", marginTop: 0 }}
        >
          <MyFormControlLabel value="first" label="قيد التحرير" control={<Radio />} />
          <MyFormControlLabel value="second" label="قيد المراجعه" control={<Radio />} />
        </RadioGroup>

        <div style={{ maxWidth: "500px" }}>
          <InputField multiLine={true} label="ملاحظات للمدقق" />
        </div>
      </Grid2>

      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", width: "100%" }}>
        <Grid2 container spacing={2} width={{ xs: "30%", sm: "20%" }} mt={2}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <ButtonCompnent text="حفظ" onclick={submitPublics} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <ButtonCompnent text="ارسل للمدقق" />
          </Grid2>
        </Grid2>
      </Box>

      {/* Display total time spent on the website */}
      <Grid2 container justifyContent={"center"} sx={{ mt: 5 }}>
        <Typography variant="h6" fontWeight={"bold"} color="#0F2D4D">
          إجمالي الوقت المستغرق في الموقع: {formatTime(totalTimeSpent)}
        </Typography>
      </Grid2>
    </Grid2>
  );
}

export default LastSection;
