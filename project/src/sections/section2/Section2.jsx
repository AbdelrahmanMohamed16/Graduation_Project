import Grid from "@mui/material/Grid2";
import InputField from "../../components/Input/InputField";
import { Divider, Grid2, Typography } from "@mui/material";
import DividerComponent from "../../components/Divider/DividerComponent";

function Section2() {
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
            MorphologicalInfo={true}
          ></InputField>
        </Grid>
        <Grid size={{ xs: 12, sm: 5, md: 4, lg: 3 }}>
          {" "}
          <InputField
            label={"الفئة الكلامية"}
            select={true}
            name={"word_class"}
            MorphologicalInfo={true}
            options={["مشتق", "مصدر", "علم", "ظرف"]}
          ></InputField>
        </Grid>
        <Grid size={{ xs: 12, sm: 5, md: 4, lg: 3 }}>
          {" "}
          <InputField
            label={"الصيغة الصرفية"}
            select={true}
            name={"morphological_form"}
            MorphologicalInfo={true}
            options={[
              "اسم فاعل",
              "اسم مفعول",
              "صيغة مبالغة",
              "مصدر ميمي",
              "مصدر صناعي",
              "نسبة",
              "اسم مكان",
              "اسم زمان",
              "اسم آلة",
              "صفة مشبهة",
              "اسم همزة",
              "اسم هيئة",
              "اسم تفضيل",
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
          ></InputField>
        </Grid>
      </Grid>
    </div>
  );
}

export default Section2;
