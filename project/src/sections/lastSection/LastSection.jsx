import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import InputField from "../../components/Input/InputField";
import ButtonCompnent from "../../components/Button/ButtonCompnent";
import Grid from "@mui/material/Grid2";
import { Box, Grid2, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataWithState,
  updateDiacritics,
  updateDiacriticswithRecord,
  updateForm,
  updateMeaning,
  updateSemantic_info,
  updateSemantic_infowithImage,
} from "../../redux/userSlice";

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
  /**
   * The value of the component.
   */
  value: PropTypes.any,
};

function LastSection({ files, records }) {
  let imageFormData = new FormData();
  let recordFormData = new FormData();
  const dispatch = useDispatch();

  const diacritic = useSelector((state) => state.user.diacritics);
  const morphological = useSelector((state) => state.user.morphological_info);
  const semantic = useSelector((state) => state.user.semantic_info);
  const sendImages = async (file) => {
    imageFormData.append("image", file);
    try {
      await fetch(
        "https://arabic-data-collector.onrender.com/api/v1/upload/image",
        {
          method: "POST",
          body: imageFormData,
        }
      ).then(async (res) => {
        imageFormData = new FormData();
        const response = await res.json();
        const imageURL = `https://arabic-data-collector.onrender.com${encodeURI(
          response.filePath
        )}`;
        return imageURL;
      });
    } catch (e) {
      console.log(e);
    }
  };
  const sendRecord = async (record) => {
    try {
      recordFormData.append("record", record);
      await fetch(
        "https://arabic-data-collector.onrender.com/api/v1/upload/record",
        {
          method: "POST",
          body: recordFormData,
        }
      ).then(async (res) => {
        recordFormData = new FormData();
        const response = await res.json();
        const recordURL = `https://arabic-data-collector.onrender.com${encodeURI(
          response.filePath
        )}`;
        return recordURL;
      });
    } catch (e) {
      console.log(e);
    }
  };
  const submitPublics = async () => {
    for (let index = 0; index < files.length; index++) {
      const imageURL = await sendImages(files[index]);
      dispatch(
        updateSemantic_infowithImage({
          index: files[index].index,
          imageURL: imageURL,
        })
      );
    }
    for (let index = 0; index < records.length; index++) {
      const recordURL = await sendImages(records[index]);
      dispatch(
        updateDiacriticswithRecord({ index: index, recordURL: recordURL })
      );
    }
    // sendImages(files[0].image);
    // sendRecord(records[0]);
    console.log("##diacritic: ", diacritic);
    console.log("##semantic_info: ", semantic);
    console.log("##morphological_info: ", morphological);
    // dispatch(updateForm({ name: "diacritics", value: diacritic }));
    // dispatch(updateForm({ name: "semantic_info", value: semantic }));
    // dispatch(updateForm({ name: "morphological_info", value: morphological }));

    // dispatch(fetchDataWithState());
  };
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Typography
          variant="h6"
          fontWeight={"bold"}
          fontFamily={"El Messiri"}
          color="#0F2D4D"
        >
          المسار:
        </Typography>
      </Grid2>
      <Grid2 size={12} ml={2}>
        <RadioGroup
          name="use-radio-group"
          defaultValue="first"
          sx={{ width: "fit-content", direction: "rtl", marginTop: 0 }}
        >
          <MyFormControlLabel
            value="first"
            label="قيد التحرير"
            control={<Radio />}
          />
          <MyFormControlLabel
            value="second"
            label="قيد المراجعه"
            control={<Radio />}
          />
        </RadioGroup>
        <div style={{ maxWidth: "500px" }}>
          <InputField multiLine={true} label="ملاحظات للمدقق" />
        </div>
      </Grid2>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Grid container spacing={2} width={{ xs: "30%", sm: "20%" }} mt={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ButtonCompnent text="حفظ" onclick={submitPublics}></ButtonCompnent>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <ButtonCompnent text="ارسل للمدقق"></ButtonCompnent>
          </Grid>
        </Grid>
      </Box>
    </Grid2>
  );
}

export default LastSection;
