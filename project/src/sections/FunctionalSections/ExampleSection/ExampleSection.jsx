import React from "react";
import Grid from "@mui/material/Grid";

import ButtonCompnent from "../../../components/Button/ButtonCompnent";
import InputField from "../../../components/Input/InputField";

function Example({ data, onChange, textLabel = "أمثلة إستعمالية", sourceLabel = "المصدر" }) {
  const { text, source } = data;

  return (
    <Grid container spacing={2} sx={{ my: "10px" }}>
      <Grid item xs={12} md={5}>
        <InputField
          label={textLabel}
          text={true}
          val={text}
          set={(value) => onChange("text", value)}
          sx={{ width: "100%" }} 
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <InputField
          label={sourceLabel}
          text={true}
          val={source}
          set={(value) => onChange("source", value)}
          sx={{ width: "100%" }} 
        />
      </Grid>
    </Grid>
  );
}

export default function ExampleSection({ examples, onChange, addExample }) {
  return (
    <Grid container spacing={3} sx={{ padding: "20px" }}>
      {examples.map((example) => (
        <Example
          key={example.id}
          data={example}
          onChange={(field, value) => onChange(example.id, field, value)}
          textLabel="مثال"
          sourceLabel="المرجع"
        />
      ))}
      <Grid item xs={5}>
        <ButtonCompnent
          text="أضف مثال آخر"
          rounded={true}
          icon={true}
          onclick={addExample}
          sx={{ width: "100%" }}
        />
      </Grid>
    </Grid>
  );
}
