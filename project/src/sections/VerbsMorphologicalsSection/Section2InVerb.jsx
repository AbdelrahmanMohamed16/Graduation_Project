import Grid from "@mui/material/Grid2";
import InputField from "../../components/Input/InputField";
import { Button, Grid2, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ButtonCompnent from "../../components/Button/ButtonCompnent";
import {
  deleteMorphologicalInfoExample,
  updateMorphologicalInfo,
} from "../../redux/userSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

function ExampleData({ index, setExamples, data, onChange }) {
  const dispatch = useDispatch();
  return (
    <Grid2 container spacing={2} size={12} sx={{ my: "10px" }}>
      <Grid2 size={{ xs: 12, md: 10 }}>
        <InputField
          text={true}
          label="الصور الاشتقاقية"
          val={data}
          set={(value) => onChange(value)}
        />
      </Grid2>
      {index ? (
        <Grid2 size={{ xs: 12, md: 2 }}>
          <Button
            variant="contained"
            size="large"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => {
              Swal.fire({
                title: "هل أنت متأكد؟",
                text: "لن يمكنك الرجوع عن هذا الأمر",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم",
                cancelButtonText: "لا",
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(deleteMorphologicalInfoExample({ index }));
                  setExamples((prev) =>
                    prev.filter((example) => example !== prev[index])
                  );
                }
              });
            }}
          >
            حذف الصورة الإشتقاقية
          </Button>
        </Grid2>
      ) : (
        <></>
      )}
    </Grid2>
  );
}
function Section2InVerb() {
  const [example, setExamples] = useState([""]);
  const dispatch = useDispatch();
  const handleChange = (index, value) => {
    setExamples((prev) =>
      prev.map((example, i) => (i === index ? value : example))
    );
  };
  const addExample = () => {
    setExamples((prev) => [...prev, ""]);
  };

  const morphologicalInfo = useSelector(
    (state) => state.user.form?.morphological_info
  );
  const [form_morphological_info, setForm_morphological_info] = useState(
    morphologicalInfo || {}
  );
  useEffect(() => {
    setForm_morphological_info(morphologicalInfo);
    setTex(morphologicalInfo?.root);
    setExamples(morphologicalInfo?.derivational_forms || [""]);
  }, [morphologicalInfo]);
  useEffect(() => {
    dispatch(
      updateMorphologicalInfo({ name: "derivational_forms", value: example })
    );
  }, [example]);

  const [tex, setTex] = useState(form_morphological_info?.root);
  return (
    <div id="section2">
      <Grid
        container
        rowSpacing={5}
        columnGap={5}
        columnSpacing={{ xs: 1, sm: 2, md: 5 }}
      >
        <Grid2 size={12}>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            fontFamily={"El Messiri"}
            color="#0F2D4D"
          >
            المعلومات الصرفية:
          </Typography>
        </Grid2>
        <Grid size={{ xs: 12, sm: 5, md: 4, lg: 3 }}>
          <InputField
            label={"الاصل اللغوي"}
            text={true}
            name={"root"}
            val={tex}
            set={setTex}
            MorphologicalInfo={true}
          ></InputField>
        </Grid>
        <Grid size={{ xs: 12, sm: 5, md: 4, lg: 3 }}>
          {" "}
          <InputField
            label={"الميزان الصرفى"}
            select={true}
            name={"morphological_balance"}
            MorphologicalInfo={true}
            verbs={true}
            val={form_morphological_info?.morphological_balance} //change it to based on the body of the backend
            defaultOption={form_morphological_info?.morphological_balance} //change it to based on the body of the backend
            options={[
              "فَعَل",
              "فَعُل",
              "فَعِل",
              "أَفعَلَ",
              "اتفَعَلَ",
              "تفاعَل",
              "تفعَّل",
              "استَفعل",
              "فَعَّلَ",
            ]}
          ></InputField>
        </Grid>
        <Grid size={{ xs: 12, sm: 5, md: 4, lg: 3 }}>
          {" "}
          <InputField
            label={"المستوى اللغوي"}
            select={true}
            name={"linguistic_level"}
            MorphologicalInfo={true}
            options={["تراثي", "معاصر", "دخيل", "معرَّب"]}
            defaultOption={form_morphological_info?.linguistic_level}
          ></InputField>
        </Grid>
        <Grid2
          container
          // size={{ xs: 12, sm: 6, md: 4, lg: 5 }}
          size={{ xs: 12, md: 10 }}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {example.map((data, index) => (
            <ExampleData
              key={index}
              data={data}
              index={index}
              setExamples={setExamples}
              onChange={(value) => {
                handleChange(index, value);
              }}
            />
          ))}
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ButtonCompnent
            text="اضف صورة اشتقاقية جديدة"
            icon={true}
            onclick={() => {
              addExample();
            }}
          />
        </Grid2>
      </Grid>
    </div>
  );
}

export default Section2InVerb;
