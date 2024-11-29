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

function LastSection({ files, records }) {
  let imageFormData = new FormData();
  let recordFormData = new FormData();
  const dispatch = useDispatch();
  const diacriticFromStore = useSelector((state) => state.user.diacritics);
  const [diacritic, setDiacritic] = React.useState(diacriticFromStore);
  const handlePrint = () => {
    window.print();
  };

  React.useEffect(() => {
    if (diacriticFromStore.length > 0) {
      setDiacritic(diacriticFromStore);
    }
  }, [diacriticFromStore]);
  const morphological = useSelector((state) => state.user.morphological_info);
  const semanticFromStore = useSelector((state) => state.user.semantic_info);
  const [semantic, setSemantic] = React.useState(semanticFromStore);
  React.useEffect(() => {
    if (semanticFromStore.length > 0) {
      setSemantic(semanticFromStore);
    }
  }, [semanticFromStore]);
  const sendImages = async (file) => {
    let imageURL = "";
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
        imageURL = `https://arabic-data-collector.onrender.com${encodeURI(
          response.filePath
        )}`;
      });
    } catch (e) {
      console.log(e);
    }
    return imageURL;
  };
  const sendRecord = async (record) => {
    let recordURL = "";
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
        recordURL = `https://arabic-data-collector.onrender.com${encodeURI(
          response.filePath
        )}`;
      });
    } catch (e) {
      console.log(e);
    }
    return recordURL;
  };

  const submitPublics = async () => {
    try {
      let updatedSemantic = await structuredClone(semantic);

      for (let index = 0; index < files.length; index++) {
        const imageURL = await sendImages(files[index].image);

        const semanticObject = updatedSemantic[files[index].index];

        if (
          semanticObject &&
          semanticObject.meaning &&
          semanticObject.meaning.image
        ) {
          semanticObject.meaning.image.url = imageURL;
        }
      }

      let updatedDiacritic = await structuredClone(diacritic);
      for (let index = 0; index < records.length; index++) {
        const recordURL = await sendRecord(records[index]);

        updatedDiacritic[index].pronounciation = recordURL; // Update specific field
      }

      setDiacritic(updatedDiacritic);
      setSemantic(updatedSemantic);
      dispatch(updateForm({ name: "diacritics", value: updatedDiacritic }));
      dispatch(updateForm({ name: "semantic_info", value: updatedSemantic }));
      dispatch(
        updateForm({ name: "morphological_info", value: morphological })
      );

      dispatch(fetchDataWithState());
    } catch (error) {
      console.error("Error in submitPublics: ", error);
    }
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
        <Grid container spacing={2} width={{ xs: "30%", sm: "50%" }} mt={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ButtonCompnent text="حفظ" onclick={submitPublics}></ButtonCompnent>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ButtonCompnent text="ارسل للمدقق"></ButtonCompnent>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ButtonCompnent onclick={handlePrint} text="اطبع"></ButtonCompnent>
          </Grid>
        </Grid>
      </Box>
    </Grid2>
  );
}

export default LastSection;
