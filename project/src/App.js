import { createTheme, Grid2, ThemeProvider } from "@mui/material";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import Login from "./pages/Login";
import Section2 from "./sections/Section2/Section2";
import Section4 from "./sections/Section4/Section4";
import LastSection from "./sections/LastSection/LastSection";
import Section1 from "./sections/Section1";
import DividerComponent from "./components/Divider/DividerComponent";
import Section3 from "./sections/Section3";
function App() {
  const theme = (outerTheme) =>
    createTheme({
      direction: "rtl",
      palette: {
        // mode: outerTheme.palette.mode,
      },
    });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          {/* <Login /> */}
          <Grid2 container>
            <Grid2 mx={4} my={3} width={"100%"}>
              <Section1 />
              <DividerComponent />
              <Section2 />
              <DividerComponent />
              <Section3 />
              <DividerComponent />
              <Section4 />
              <DividerComponent />
              <LastSection />
            </Grid2>
          </Grid2>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default App;
