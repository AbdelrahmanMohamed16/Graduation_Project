import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid2";
import InputField from "../../components/Input/InputField";
import Box from "@mui/material/Box";
import ButtonCompnent from "../../components/Button/ButtonCompnent";
import { Stack, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import MyFormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import ExampleData from "../Section3";
import {
  clearCollocates,
  clearCollocates_Obj,
  clearSemantic_info_obj,
  updateCollocates,
  updateCollocates_obj,
  updateSemantic_info,
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
          set={(value) => onChange("source", value)}
        />
      </Grid>
    </Grid>
  );
}

function Section4({
  data,
  setValue,
  setValue2,
  arrCollocates,
  setArrCollocates,
  index,
  collocatesIndex,
}) {
  const [collocate_text, setCollocate_text] = useState(data?.collocate_text);
  const [meaning, Setmeaning] = useState(data?.meaning);
  const [example, setExamples] = useState(data?.example || [{ text: "", source: "" }]);
  const [completed, setCompleted] = useState(useSelector((state) => state.user.semantic_info_obj.completed) || false);
  const collocates_obj = useSelector((state) => state.user.collocates_obj);
  const meaning_obj = useSelector((state) => state.user.meaning);
  const dispatch = useDispatch();
  const [isRichTextEnabled, setIsRichTextEnabled] = useState(false);
  const [examplesText, setExamplesText] = useState("");
  const quillRef = useRef(null);

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const toggleRichText = () => {
    if (isRichTextEnabled && quillRef.current) {
      setExamplesText(stripHtml(examplesText));
    }
    setIsRichTextEnabled(!isRichTextEnabled);
  };

  const handleNewSemantic = () => {
    if (collocates_obj.collocate_text !== undefined) {
      if (collocatesIndex || collocatesIndex === 0) {
        dispatch(updateCollocates({ arr: null, collocatesIndex: collocatesIndex }));
      } else {
        dispatch(updateCollocates({ arr: null, collocatesIndex: null }));
      }
      dispatch(updateSemantic_info_obj({ name: "collocates", value: null }));
    }
    dispatch(updateSemantic_info_obj({ name: "meaning", value: meaning_obj }));
    dispatch(updateSemantic_info_obj({ name: "completed", value: completed }));
    if (index !== undefined) {
      dispatch(updateSemantic_info({ index: index }));
    } else {
      dispatch(updateSemantic_info({ index: null }));
    }
    dispatch(clearSemantic_info_obj());
    dispatch(clearCollocates());
    setValue(-1);
    setValue2(-1);
  };

  const handleChange = (index, field, value) => {
    setExamples((prev) =>
      prev.map((example, i) => (i === index ? { ...example, [field]: value } : example))
    );
    dispatch(updateCollocates_obj({ name: "example", value: example }));
  };

  const handleAddNewCollocates = () => {
    if (collocatesIndex || collocatesIndex === 0) {
      dispatch(updateCollocates({ arr: null, collocatesIndex: collocatesIndex }));
    } else {
      dispatch(updateCollocates({ arr: null, collocatesIndex: null }));
    }
    if (!arrCollocates) {
      setArrCollocates([collocates_obj]);
    } else {
      setArrCollocates([...arrCollocates, collocates_obj]);
    }
    dispatch(clearCollocates_Obj());
    setCollocate_text("");
    Setmeaning("");
    setExamples([{}]);
    setValue2(-1);
  };

  const addExample = () => {
    setExamples((prev) => [...prev, { text: "", source: "" }]);
  };

  useEffect(() => {
    dispatch(updateCollocates_obj({ name: "collocate_text", value: data?.collocate_text }));
    dispatch(updateCollocates_obj({ name: "example", value: data?.example }));
    dispatch(updateCollocates_obj({ name: "meaning", value: data?.meaning }));
  }, [data, dispatch]);

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "30px", mt: 15 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" fontFamily="El Messiri" color="#0F2D4D">
            المتصاحبات اللفظية:
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={2}>
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
          <Grid size={{ xs: 12, md: 2 }} sx={{ margin: "auto" }}>
            <ButtonCompnent text="أضف متصاحبة جديدة" rounded={true} icon={true} onclick={handleAddNewCollocates} />
          </Grid>
        </Grid>

        {example.map((data, index) => (
          <Example key={index} data={data} onChange={(field, value) => handleChange(index, field, value)} />
        ))}

        <Grid size={{ xs: 12, md: 6 }}>
          <ButtonCompnent text="أضف مثال آخر" rounded={true} icon={true} onclick={addExample} />
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
                border: "1px solid #e0e0e0",
              }}
            >
              {isRichTextEnabled ? (
                <ReactQuill
                  ref={quillRef}
                  value={examplesText}
                  onChange={setExamplesText}
                  modules={{ toolbar: [["bold"], [{ color: [] }]] }}
                  style={{ height: "200px" }}
                />
              ) : (
                <InputField
                  text={true}
                  label="أمثلة إستعمالية"
                  val={examplesText}
                  set={setExamplesText}
                />
              )}
            </Box>

            {/* Toggle button positioned below the editor */}
            <Typography
              onClick={toggleRichText}
              sx={{
                fontSize: "14px",
                color: "#1a73e8",
                cursor: "pointer",
                mt: 1,
                padding: "8px 12px",
                borderRadius: "4px",
                transition: "background-color 0.3s, color 0.3s",
                display: "inline-block",
                "&:hover": {
                  backgroundColor: "#e0f3ff",
                  color: "#1a73e8",
                },
                position: "relative",
                zIndex: 10,
              }}
            >
              {isRichTextEnabled ? "التبديل إلى نص عادي" : "تمكين التنسيق"}
            </Typography>
          </Grid>
        </Grid>

        <Grid container size={12} sx={{ mt: 10, justifyContent: "start" }}>
          <Grid size={{ xs: 12, sm: 6, md: 1 }}>
            <Typography variant="h5" fontWeight="bold" fontFamily="El Messiri" color="#0F2D4D">
              مواقع للبحث:
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <a href="https://falak.ksaa.gov.sa/" target="_blank" rel="noreferrer">
              <ButtonCompnent text="فلك" />
            </a>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <a href="https://www.sketchengine.eu/" target="_blank" rel="noreferrer">
              <ButtonCompnent text="Sketch" />
            </a>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <a href="https://chat.com/" target="_blank" rel="noreferrer">
              <ButtonCompnent text="AI" />
            </a>
          </Grid>
        </Grid>

        <Grid size={12} mt={10}>
          <Typography variant="h6" fontWeight="bold" fontFamily="El Messiri" color="#0F2D4D">
            حالة البطاقة:
          </Typography>
        </Grid>
        <Grid size={12} ml={2}>
          <RadioGroup
            name="use-radio-group"
            defaultValue="first"
            value={completed ? "second" : "first"}
            sx={{ width: "fit-content", direction: "rtl", marginTop: 0 }}
            onChange={(e) => setCompleted(e.target.value === "second")}
          >
            <MyFormControlLabel value="first" control={<Radio />} label="غير مكتملة" />
            <MyFormControlLabel value="second" control={<Radio />} label="مكتملة" />
          </RadioGroup>
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: "30px" }}>
          <Grid item xs={12} md={3}>
            <ButtonCompnent text="تحديث" icon={true} rounded={true} onclick={handleNewSemantic} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Section4;
