import Grid from "@mui/material/Grid2";
import InputField from "../Input/InputField";

function Example() {
  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <InputField text={true} label="أمثلة إستعمالية" />
      </Grid>
      <Grid size={2}>
        <InputField text={true} label="المصدر" />
      </Grid>
    </Grid>
  );
}

export default Example;
