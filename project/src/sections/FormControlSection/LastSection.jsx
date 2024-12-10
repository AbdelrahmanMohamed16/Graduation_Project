import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import InputField from "../../components/Input/InputField";
import ButtonCompnent from "../../components/Button/ButtonCompnent";
import Grid from "@mui/material/Grid2";
import { Box, CircularProgress, Grid2, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  clearForm,
  fetchDataWithState,
  fetchDataWithStateVirb,
  updateForm,
} from "../../redux/userSlice";
import LoadingButton from "@mui/lab/LoadingButton";

const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme }) => ({
  variants: [
    {
      props: { checked: true },
      style: {
        marginLeft: 0,
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

function LastSection({
  files,
  records,
  verb = false,
  value,
  value2,
  setFiles,
  setRecords,
}) {
  let imageFormData = new FormData();
  let recordFormData = new FormData();
  const stateFromStore = useSelector((s) => s.user.form.state);
  const [status, setStatus] = React.useState(
    stateFromStore ? stateFromStore : "قيد التحرير"
  );
  const notesFromStore = useSelector((s) => s.user.form.notes);
  const [notes, setNotes] = React.useState(
    notesFromStore ? notesFromStore : ""
  );
  const dispatch = useDispatch();
  const diacriticFromStore = useSelector((state) => state.user.diacritics);
  const [diacritic, setDiacritic] = React.useState(diacriticFromStore);
  const handlePrint = () => {
    window.print();
  };

  React.useEffect(() => {
    if (diacriticFromStore?.length > 0) {
      setDiacritic(diacriticFromStore);
    }
  }, [diacriticFromStore]);
  const morphological = useSelector((state) => state.user.morphological_info);
  const semanticFromStore = useSelector((state) => state.user.semantic_info);
  const [semantic, setSemantic] = React.useState(semanticFromStore);
  const isLoading = useSelector((state) => state.user.loading);

  React.useEffect(() => {
    if (semanticFromStore?.length > 0) {
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
    if (value === -1 && value2 === -1) {
      try {
        let updatedSemantic = await structuredClone(semantic);

        for (let index = 0; index < files?.length; index++) {
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
        console.log(updatedSemantic);
        let updatedDiacritic = await structuredClone(diacritic);
        for (let index = 0; index < records?.length; index++) {
          const recordURL = await sendRecord(records[index]);

          updatedDiacritic[index].pronounciation = recordURL; // Update specific field
        }
        // to prevent multiple upload times
        setFiles([]);
        setRecords([]);

        setDiacritic(updatedDiacritic);
        setSemantic(updatedSemantic);
        // dispatch(updateForm({ name: "state", value: status }));
        dispatch(updateForm({ name: "notes", value: notes }));
        dispatch(updateForm({ name: "diacritics", value: updatedDiacritic }));
        dispatch(updateForm({ name: "semantic_info", value: updatedSemantic }));
        dispatch(
          updateForm({ name: "morphological_info", value: morphological })
        );
        verb
          ? dispatch(fetchDataWithStateVirb())
          : dispatch(fetchDataWithState());
      } catch (error) {
        console.error("Error in submitPublics: ", error);
      }
    } else {
      Swal.fire({
        title: "يرجي اتمام حفظ المعلومىة الدلالية",
        confirmButtonText: "موافق", // Change the button text here
      });
    }
  };

  const handleSend = async () => {
    dispatch(updateForm({ name: "state", value: "قيد المراجعه" }));
    submitPublics();
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
          value={status}
          onChange={() => {
            setStatus(
              status === "قيد التحرير" ? "قيد المراجعه" : "قيد التحرير"
            );
          }}
          sx={{ width: "fit-content", direction: "rtl", marginTop: 0 }}
        >
          <MyFormControlLabel
            value="قيد التحرير"
            label="قيد التحرير"
            control={<Radio />}
          />
          <MyFormControlLabel
            value="قيد المراجعه"
            label="قيد المراجعه"
            control={<Radio />}
          />
        </RadioGroup>
        <div style={{ maxWidth: "500px" }}>
          <InputField
            multiLine={true}
            val={notes}
            set={setNotes}
            label="ملاحظات للمدقق"
          />
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
            <LoadingButton
              variant="contained"
              loading={isLoading}
              loadingIndicator={
                <CircularProgress
                  size={24}
                  sx={{
                    color: "#ffffff", // Change spinner color
                  }}
                />
              }
              // loadingPosition="start"
              sx={{
                width: "100%",
                background: "linear-gradient(to right, #0F2D4D, #2369B3)",
                borderRadius: "5px",
                fontSize: "16px",
                fontWeight: "bold",
                "&.MuiLoadingButton-loading": {
                  background: "linear-gradient(to right, #0F2D4D, #2369B3)", // Keep the background color during loading
                },
              }}
              onClick={submitPublics}
            >
              حفظ
            </LoadingButton>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            {/* <ButtonCompnent
              text="ارسل للمدقق"
              onclick={handleSend}
            ></ButtonCompnent> */}
            <LoadingButton
              variant="contained"
              loading={isLoading}
              loadingIndicator={
                <CircularProgress
                  size={24}
                  sx={{
                    color: "#ffffff", // Change spinner color
                  }}
                />
              }
              // loadingPosition="start"
              sx={{
                width: "100%",
                background: "linear-gradient(to right, #0F2D4D, #2369B3)",
                borderRadius: "5px",
                fontSize: "16px",
                fontWeight: "bold",
                "&.MuiLoadingButton-loading": {
                  background: "linear-gradient(to right, #0F2D4D, #2369B3)", // Keep the background color during loading
                },
              }}
              onClick={handleSend}
            >
              ارسال للمدقق
            </LoadingButton>
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
