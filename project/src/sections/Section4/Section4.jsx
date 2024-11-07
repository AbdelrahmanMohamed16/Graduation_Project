import Grid from "@mui/material/Grid2";
import InputField from "../../components/Input/InputField";
import Box from "@mui/material/Box";
import ButtonCompnent from "../../components/Button/ButtonCompnent";
import { useState } from "react";
import DividerComponent from "../../components/Divider/DividerComponent";
import { Grid2, Typography } from "@mui/material";

function Section4() {
  const [components, setComponents] = useState([]);

  const handelExample = () => {};
  return (
    <>
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
            <InputField text={true} label="التركيب التصاحبي" />
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <InputField text={true} label="معني التركيب التصاحبي" />
          </Grid>
          <Grid
            size={{ xs: 12, md: 3 }}
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
          <Grid size={{ xs: 12, md: 6 }}>
            <InputField text={true} label="أمثلة إستعمالية" />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <InputField text={true} label="المصدر" />
          </Grid>
          <Grid
            size={{ xs: 12, md: 3 }}
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
