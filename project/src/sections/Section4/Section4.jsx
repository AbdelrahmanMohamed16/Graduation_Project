import Grid from "@mui/material/Grid2";
import InputField from "../../components/Input/InputField";
import Box from "@mui/material/Box";
import ButtonCompnent from "../../components/Button/ButtonCompnent";
import { useState } from "react";
import Example from "../../components/Example/Example";
import { Grid2, Stack, Typography } from "@mui/material";

function Section4() {
  const [components, setComponents] = useState([]);
  const [collocations, setCollocations] = useState([]);

  const handelExample = () => {
    setComponents([...components, <Example key={components.length} />]);
  };
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          mt: 15,
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
            <Stack>
              {collocations.map((collocation, index) => (
                <div
                  key={index}
                  style={{
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "18px",
                    marginBottom: "15px",
                  }}
                >
                  {collocation}
                </div>
              ))}
            </Stack>
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
          <Grid
            size={12}
            sx={{
              margin: "auto",
            }}
          >
            {components.map((component, index) => (
              <div key={index} style={{ marginTop: 15 }}>
                {component}
              </div>
            ))}
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
                <ButtonCompnent text="اضف معلومة دلالية جديدة" icon={true} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Section4;
