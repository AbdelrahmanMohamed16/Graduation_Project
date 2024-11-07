import { Grid2, Typography } from "@mui/material";
import React, { Fragment, useRef, useState } from "react";
import InputField from "../../components/Input/InputField";
import Voice from "../../components/Voice/Voice";
import ButtonCompnent from "../../components/Button/ButtonCompnent";

function DataInputs() {
  return (
    <Grid2
      container
      size={12}
      rowSpacing={5}
      columnSpacing={{ xs: 1, sm: 2, md: 5 }}
    >
      <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        {" "}
        <InputField label="الضبط التام بالشكل " text={true} />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        {" "}
        <InputField label="الكتابة الصوتية" text={true} />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        {" "}
        <Voice />
      </Grid2>
    </Grid2>
  );
}

export default function Section1({ word = "المدخل" }) {
  const [examples, setExamples] = useState([<DataInputs />]);
  return (
    <>
      <Typography
        variant="h4"
        fontWeight={"bold"}
        fontFamily={"El Messiri"}
        color="#0F2D4D"
        mb={3}
      >
        مستويات التحرير:
      </Typography>
      <Grid2
        container
        mt={2}
        rowSpacing={5}
        columnSpacing={{ xs: 1, sm: 2, md: 5 }}
      >
        <Grid2 size={{ xs: 8, sm: 4, md: 3 }}>
          <InputField label={word} text={true} disabled={true} />
        </Grid2>
        <Grid2 size={12}>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            fontFamily={"El Messiri"}
            color="#0F2D4D"
          >
            المعلومات الصوتية:
          </Typography>
        </Grid2>
        {examples.map((example, i) => (
          <Fragment key={i}>{example}</Fragment>
        ))}
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ButtonCompnent
            text="اضف مثال جديد"
            icon={true}
            onclick={() =>
              setExamples((prevFields) => [...prevFields, <DataInputs />])
            }
          />
        </Grid2>
      </Grid2>
    </>
  );
}
