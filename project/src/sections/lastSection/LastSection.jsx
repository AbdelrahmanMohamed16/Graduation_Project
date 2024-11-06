import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import InputField from "../../components/Input/InputField";
import ButtonCompnent from "../../components/Button/ButtonCompnent";
import Grid from "@mui/material/Grid2";
import { Box, Grid2, Stack } from "@mui/material";

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

function LastSection() {
  return (
    <>
      <div>
        {" "}
        <h5>حاله البطاقه:</h5>
        <RadioGroup
          name="use-radio-group"
          defaultValue="first"
          sx={{ width: "fit-content", direction: "rtl", marginTop: 0 }}
        >
          <MyFormControlLabel value="first" label="مكتمل" control={<Radio />} />
          <MyFormControlLabel value="second" label="ناقص" control={<Radio />} />
        </RadioGroup>
      </div>
      {/* <div>
        {" "}
        <h5>المسار:</h5>
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
      </div> */}
      <div style={{ width: "350px" }}>
        <InputField multiLine={true} label="ملاحظات للمدقق" />
      </div>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Grid container spacing={2} width={"20%"}>
          <Grid size={6}>
            <ButtonCompnent text="حفظ"></ButtonCompnent>
          </Grid>
          <Grid size={6}>
            <ButtonCompnent text="ارسل للمدق"></ButtonCompnent>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default LastSection;
