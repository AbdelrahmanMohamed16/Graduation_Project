import Grid from "@mui/material/Grid2";
import InputField from "../../components/Input/InputField";
import Box from "@mui/material/Box";
import ButtonCompnent from "../../components/Button/ButtonCompnent";
import { useState } from "react";
import DividerComponent from "../../components/Divider/DividerComponent";

function Section4() {
  const [components, setComponents] = useState([]);

  const handelExample = () => {};
  return (
    <>
      <h3>المتصاحبات اللفظية:</h3>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <Grid container spacing={2}>
          <Grid size={3}>
            <InputField text={true} label="التركيب التصاحبي" />
          </Grid>
          <Grid size={5}>
            <InputField text={true} label="معني التركيب التصاحبي" />
          </Grid>
          <Grid
            size={2}
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
          <Grid size={6}>
            <InputField text={true} label="أمثلة إستعمالية" />
          </Grid>
          <Grid size={2}>
            <InputField text={true} label="المصدر" />
          </Grid>
          <Grid
            size={2}
            sx={{
              margin: "auto",
            }}
          >
            <div style={{ width: "100%" }} onClick={handelExample}>
              {" "}
              <ButtonCompnent
                text="أضف مثال آخر"
                rounded={true}
                icon={true}
              ></ButtonCompnent>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Section4;
