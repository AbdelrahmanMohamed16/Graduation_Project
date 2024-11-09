import Grid from "@mui/material/Grid2";
import InputField from "../Input/InputField";

function Example() {
  return (
    <Grid container spacing={2} size={12}>
      <Grid size={{ xs: 12, md: 6 }}>
        <InputField text={true} label="أمثلة إستعمالية" />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <InputField text={true} label="المصدر" />
      </Grid>
    </Grid>
  );
}

export default Example;
