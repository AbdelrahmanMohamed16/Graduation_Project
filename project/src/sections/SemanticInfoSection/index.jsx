import { Button, Grid2, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputField from "../../components/Input/InputField";
import ButtonCompnent from "../../components/Button/ButtonCompnent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PlaceholderImage from "../../assets/images/landscape-placeholder-svgrepo-com.svg";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  deleteSemanticInfoMeaningExample,
  updateMeaning,
} from "../../redux/userSlice";
import DeleteIcon from "@mui/icons-material/Delete";

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

function ExampleData({ index, setExamples, data, onChange }) {
  const { text, source } = data;
  const [editingTextFormat, seteditingTextFormat] = useState(false);
  const dispatch = useDispatch();
  return (
    <Grid2 container spacing={2} size={12}>
      <Grid2 size={{ xs: 12, md: 8 }}>
        <InputField
          text={true}
          label="أمثلة"
          val={text}
          set={(value) => onChange("text", value)}
        />
        {editingTextFormat && (
          <ReactQuill
            value={text}
            onChange={(value) => onChange("text", value)}
            modules={{
              toolbar: [["bold"], [{ color: [] }]],
            }}
            style={{
              width: "100%", // Keeps the original width you wanted
              // minHeight: "150px", // Matches the box height
              marginLeft: "-65%", // Offsets the content to align correctly
            }}
          />
        )}
        <Typography
          variant="p"
          color="red"
          component={"button"}
          fontSize={"15px"}
          border={"none"}
          mt={1}
          bgcolor={"transparent"}
          onClick={() => seteditingTextFormat(!editingTextFormat)}
        >
          {editingTextFormat
            ? " اخفاء التنسيق"
            : !text.includes("<")
            ? "تنسيق المثال"
            : "عرض التنسيق"}
        </Typography>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <InputField
          text={true}
          label="المرجع"
          val={source}
          set={(value) => {
            onChange("source", value);
          }}
        />
      </Grid2>
      {index ? (
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Button
            variant="contained"
            size="large"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => {
              dispatch(deleteSemanticInfoMeaningExample({ index }));
              setExamples((prev) =>
                prev.filter((example) => example !== prev[index])
              );
            }}
          >
            حذف المثال
          </Button>
        </Grid2>
      ) : (
        <></>
      )}
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

  const [example, setExamples] = useState(
    arr?.example || [{ file: "", text: "", source: "" }]
  );
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
    if (image)
      dispatch(updateMeaning({ name: "image", value: image, arr: null }));
  }, [dispatch, image]);

  const addExample = () => {
    setExamples((prev) => [...prev, { text: "", source: "" }]);
  };
  return (
    <div id="section3">
      <Grid2
        container
        size={12}
        rowSpacing={5}
        columnSpacing={{ xs: 1, sm: 2, md: 5 }}
      >
        <Grid2 container size={12}>
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
        </Grid2>
        <Grid2
          container
          size={12}
          rowSpacing={5}
          columnSpacing={{ xs: 1, sm: 2, md: 5 }}
        >
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <InputField
              label="المجال الدلالي"
              select={true}
              options={options}
              defaultOption={Semantic_fields}
              name={"Semantic_fields"}
              semantic_info={true}
            />
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
          <InputField
            label="المعني"
            multiLine={true}
            meaning={true}
            val={text}
            set={setText}
            name={"text"}
          />
        </Grid2>
        <Grid2
          container
          size={{ xs: 12, sm: 6, md: 4, lg: 7 }}
          rowSpacing={5}
          columnSpacing={{ xs: 1, sm: 2, md: 5 }}
        >
          {example.map((data, i) => (
            <ExampleData
              key={i}
              index={i}
              setExamples={setExamples}
              data={data}
              onChange={(field, value) => {
                handleChange(i, field, value);
              }}
            />
          ))}
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <ButtonCompnent
            text="اضف مثال جديد"
            icon={true}
            onclick={() => {
              addExample();
            }}
          />
        </Grid2>
        <Grid2
          container
          size={12}
          rowSpacing={5}
          columnSpacing={{ xs: 1, sm: 2, md: 5 }}
        >
          <Grid2
            container
            size={{ xs: 12, sm: 4 }}
            justifyContent={"center"}
            py={2}
          >
            <Grid2 size={12}>
              <img
                width={"100%"}
                style={{ maxHeight: "300px" }}
                src={
                  image?.url
                    ? image?.url
                    : imageURL
                    ? imageURL
                    : PlaceholderImage
                }
                alt={
                  image?.url
                    ? image?.url
                    : imageURL
                    ? imageURL
                    : PlaceholderImage
                }
              />
            </Grid2>
            <Grid2 size={6}>
              <div className="no-print">
                {" "}
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  endIcon={<CloudUploadIcon />}
                  style={{ width: "100%" }}
                  sx={{
                    background: "linear-gradient(to right, #0F2D4D, #2369B3)",
                  }}
                >
                  صورة شارحة
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => {
                      if (event.target.files[0]) {
                        addFile && addFile(event.target.files[0], index);
                        setImageURL(URL.createObjectURL(event.target.files[0]));
                        setImage({
                          ...image,
                          url: URL.createObjectURL(event.target.files[0]),
                        });
                      }
                    }}
                  />
                </Button>
              </div>
            </Grid2>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <InputField
              label="وصف الصورة الشارحة"
              multiLine={true}
              name={"description"}
              setImage={setImage}
              image={image}
              val={imageText}
              set={setImageText}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 2 }}>
            <InputField
              label="المصدر"
              text={true}
              name={"source"}
              setImage={setImage}
              image={image}
              val={imageSource}
              set={setImageSource}
            />
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
}
