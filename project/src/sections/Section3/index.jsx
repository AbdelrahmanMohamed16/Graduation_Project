import { Box, Button, Grid, Grid2, styled, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import InputField from "../../components/Input/InputField";
import ButtonCompnent from "../../components/Button/ButtonCompnent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PlaceholderImage from "../../assets/images/landscape-placeholder-svgrepo-com.svg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { updateMeaning } from "../../redux/userSlice";

const VisuallyHiddenInput = styled("input")({
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function ExampleData({ data, onChange, index }) {
  const { text, source } = data;

  return (
    <Grid2 container spacing={2} size={12} sx={{ my: "10px" }}>
      <Grid2 size={{ xs: 12, md: 8 }}>
        <InputField
          text={true}
          label="أمثلة"
          val={text}
          set={(value) => onChange(index, "text", value)}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 2 }}>
        <InputField
          text={true}
          label="المرجع"
          val={source}
          set={(value) => onChange(index, "source", value)}
        />
      </Grid2>
    </Grid2>
  );
}

export default function Section3({ arr, Semantic_fields, addFile, index }) {
  const [options, setOptions] = useState([
    "العلوم",
    "الفنون",
    "الزراعة",
    "نظم المعلومات",
    "الاخلاق",
  ]);
  const [option, setOption] = useState("");
  const [text, setText] = useState(arr?.text);
  const [imageText, setImageText] = useState(arr?.image.description);
  const [imageSource, setImageSource] = useState(arr?.image.source);
  const [imageURL, setImageURL] = useState(null);
  const [example, setExamples] = useState(arr?.example || [{ file: "", text: "", source: "" }]);
  const [image, setImage] = useState(arr?.image || {});
  
  const dispatch = useDispatch();

  const handleChange = (index, field, value) => {
    setExamples((prev) =>
      prev.map((example, i) =>
        i === index ? { ...example, [field]: value } : example
      )
    );
    dispatch(updateMeaning({ name: "example", value: example, arr: null }));
  };

  useEffect(() => {
    if (image) {
      dispatch(updateMeaning({ name: "image", value: image, arr: null }));
    }
  }, [dispatch, image]);

  const addExample = () => {
    setExamples((prev) => [...prev, { text: "", source: "" }]);
  };

  return (
    <div id="section3">
      <Grid2 container size={12} rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
        <Grid2 container size={12}>
          <Grid2 size={12}>
            <Typography variant="h6" fontWeight={"bold"} fontFamily={"El Messiri"} color="#0F2D4D">
              المعلومات الدلالية:
            </Typography>
          </Grid2>
        </Grid2>
        
        <Grid2 container size={12} rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <InputField label="المجال الدلالي" select={true} options={options} defaultOption={Semantic_fields} name={"Semantic_fields"} semantic_info={true} />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <InputField label="اضف" text={true} val={option} set={setOption} />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ButtonCompnent
              text="اضف"
              icon={true}
              onclick={() => {
                setOptions((prevFields) => [...prevFields, option]);
              }}
            />
          </Grid2>
        </Grid2>
        
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <InputField label="المعني" multiLine={true} meaning={true} val={text} set={setText} name={"text"} />
        </Grid2>

        <Grid2 container size={{ xs: 12, sm: 6, md: 4, lg: 3 }} rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
          {example.map((data, i) => (
            <Fragment key={i}>
              <ExampleData data={data} onChange={handleChange} index={i} />
            </Fragment>
          ))}
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ButtonCompnent text="اضف مثال جديد" icon={true} onclick={addExample} />
        </Grid2>

        <Grid2 container size={12} rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
          <Grid2 size={{ xs: 4, sm: 2 }}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              endIcon={<CloudUploadIcon />}
              sx={{ background: "linear-gradient(to right, #0F2D4D, #2369B3)" }}
            >
              صورة شارحة
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => {
                  if (event.target.files[0]) {
                    const imageURL = URL.createObjectURL(event.target.files[0]);
                    setImageURL(imageURL);
                    setImage({ ...image, file: imageURL });
                  }
                }}
              />
            </Button>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4 }}>
            <img width={"100%"} style={{ maxHeight: "300px" }} src={imageURL || PlaceholderImage} alt={imageURL || PlaceholderImage} />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <InputField label="وصف الصورة الشارحة" multiLine={true} val={imageText} set={setImageText} />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 2 }}>
            <InputField label="المصدر" text={true} val={imageSource} set={setImageSource} />
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
}
