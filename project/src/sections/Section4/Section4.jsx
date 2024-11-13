import Grid from "@mui/material/Grid2";
import InputField from "../../components/Input/InputField";
import Box from "@mui/material/Box";
import ButtonCompnent from "../../components/Button/ButtonCompnent";
import { useState } from "react";
import { Grid2, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCollocates_obj,
  updateMeaning,
  updateSemantic_info_obj,
} from "../../redux/userSlice";
function Example({ data, onChange }) {
  const { text, source } = data;

  return (
    <Grid container spacing={2} size={12} sx={{ my: "10px" }}>
      <Grid size={{ xs: 12, md: 8 }}>
        <InputField
          text={true}
          label="أمثلة إستعمالية"
          val={text}
          set={(value) => onChange("text", value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <InputField
          text={true}
          label="المصدر"
          val={source}
          set={(value) => {
            onChange("source", value);
          }}
        />
      </Grid>
    </Grid>
  );
}

function Section4({ data, setValue }) {
  const [collocate_text, setCollocate_text] = useState(data?.collocate_text);
  const [meaning, Setmeaning] = useState(data?.meaning);
  const [example, setExamples] = useState(
    data?.example || [{ text: "", source: "" }]
  );
  const collocates_obj = useSelector((state) => state.user.collocates_obj);
  const meaning_obj = useSelector((state) => state.user.meaning);
  const image_obj = useSelector((state) => state.user.image_obj);
  const dispatch = useDispatch();
  const handleNewSemantic = async () => {
    dispatch(updateMeaning({ name: "image", value: image_obj }));
    dispatch(updateSemantic_info_obj({ name: "meaning", value: meaning_obj }));
    dispatch(
      updateSemantic_info_obj({ name: "collocates", value: collocates_obj })
    );
    setValue(-1);
  };
  const handleChange = (index, field, value) => {
    setExamples((prev) =>
      prev.map((example, i) =>
        i === index ? { ...example, [field]: value } : example
      )
    );
    dispatch(updateCollocates_obj({ name: "example", value: example }));
  };
  const addExample = () => {
    setExamples((prev) => [...prev, { text: "", source: "" }]);
  };
  return (
    <div id="section4">
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <Grid container spacing={2}>
          <Grid2 size={12}>
            <Typography
              variant="h6"
              fontWeight={"bold"}
              fontFamily={"El Messiri"}
              color="#0F2D4D"
            >
              المتصاحبات اللفظية:
            </Typography>
          </Grid2>
          <Grid size={{ xs: 12, md: 3 }}>
            <InputField
              text={true}
              label="التركيب التصاحبي"
              name={"collocate_text"}
              collocates_obj={true}
              val={collocate_text}
              set={setCollocate_text}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <InputField
              text={true}
              label="معني التركيب التصاحبي"
              name={"meaning"}
              collocates_obj={true}
              val={meaning}
              set={Setmeaning}
            />
          </Grid>
          <Grid
            size={{ xs: 12, md: 2 }}
            sx={{
              margin: "auto",
            }}
          >
            <ButtonCompnent
              text="أضف متصاحبة جديدة"
              rounded={true}
              icon={true}
            ></ButtonCompnent>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid
            size={12}
            sx={{
              margin: "auto",
            }}
          >
            {example.map((data, index) => (
              <Example
                key={index}
                data={data}
                onChange={(field, value) => {
                  handleChange(index, field, value);
                  console.log(example);
                }}
              />
            ))}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <div style={{ width: "100%" }} onClick={addExample}>
              {" "}
              <ButtonCompnent
                text="أضف مثال آخر"
                rounded={true}
                icon={true}
              ></ButtonCompnent>
            </div>
          </Grid>
          <Grid
            container
            size={12}
            sx={{
              mt: 10,
              justifyContent: "start",
            }}
          >
            <Grid size={{ xs: 12, sm: 6, md: 1 }}>
              <Typography
                variant="h5"
                fontWeight={"bold"}
                fontFamily={"El Messiri"}
                color="#0F2D4D"
              >
                مواقع للبحث:
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <a href="https://falak.ksaa.gov.sa/" target="_blank">
                <ButtonCompnent text="فلك" />
              </a>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <a href="https://www.sketchengine.eu/" target="_blank">
                <ButtonCompnent text="Sketch" />
              </a>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <a href="https://chat.com/" target="_blank">
                <ButtonCompnent text="AI" />
              </a>
            </Grid>
            <Grid container justifyContent={"center"} size={12} mt={10}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <ButtonCompnent
                  text="اضف معلومة دلالية جديدة"
                  icon={true}
                  onclick={handleNewSemantic}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Section4;
