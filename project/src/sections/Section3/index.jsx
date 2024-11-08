import { Box, Button, Grid, Grid2, styled, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import InputField from "../../components/Input/InputField";
import ButtonCompnent from "../../components/Button/ButtonCompnent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PlaceholderImage from "../../assets/images/landscape-placeholder-svgrepo-com.svg";

const VisuallyHiddenInput = styled("input")({
  //   clip: "rect(0 0 0 0)",
  //   clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default function Section3() {
  const [examples, setExamples] = useState([<ExampleData />]);
  const [file, setFile] = useState(null);
  function ExampleData() {
    return (
      <Grid2 container size={12} rowSpacing={5} columnSpacing={1}>
        <Grid2 size={6}>
          <InputField label="أمثلة" text={true} />
        </Grid2>
        <Grid2 size={6}>
          <InputField label="المرجع" text={true} />
        </Grid2>
      </Grid2>
    );
  }

  return (
    <Grid2
      container
      size={12}
      rowSpacing={5}
      columnSpacing={{ xs: 1, sm: 2, md: 5 }}
    >
      <Grid2 size={12}>
        <Typography
          variant="h6"
          fontWeight={"bold"}
          fontFamily={"El Messiri"}
          color="#0F2D4D"
        >
          المعلومات الدلالية:
        </Typography>
      </Grid2>
      <Grid2
        container
        size={12}
        rowSpacing={5}
        columnSpacing={{ xs: 1, sm: 2, md: 5 }}
      >
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <InputField label="المجال الدلالي" select={true} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <InputField label="اضف" text={true} />
        </Grid2>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <InputField label="المعني" multiLine={true} />
      </Grid2>
      <Grid2
        container
        size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
        rowSpacing={5}
        columnSpacing={{ xs: 1, sm: 2, md: 5 }}
      >
        {examples.map((example, i) => (
          <Fragment key={i}>{example}</Fragment>
        ))}
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <ButtonCompnent
          text="اضف مثال جديد"
          icon={true}
          onclick={() => {
            setExamples((prevFields) => [...prevFields, <ExampleData />]);
          }}
        />
      </Grid2>
      <Grid2
        container
        size={12}
        rowSpacing={5}
        columnSpacing={{ xs: 1, sm: 2, md: 5 }}
      >
        <Grid2 size={{ xs: 4, sm: 2 }}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            endIcon={<CloudUploadIcon />}
            sx={{
              background: "linear-gradient(to right, #0F2D4D, #2369B3)",
            }}
          >
            صورة شارحة
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => {
                console.log(event.target.files[0]);
              }}
            />
          </Button>
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 2 }}>
          <img
            width={"100%"}
            src={file ? file : PlaceholderImage}
            alt={file ? file : PlaceholderImage}
          ></img>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <InputField label="وصف الصورة الشارحة" multiLine={true} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <InputField label="المصدر" text={true} />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
