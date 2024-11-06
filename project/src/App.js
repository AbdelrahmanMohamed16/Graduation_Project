import { createTheme, ThemeProvider } from "@mui/material";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import Login from "./pages/Login";
import { useState } from "react";
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

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      {/* <ButtonCompnent text={"المدونة"} icon={true} />

      <DividerComponent />
      <Stack flexDirection={"row"}>
        <InputField text={true} />
        <InputField selected={true} />
        <InputField multiLine={true} />
      </Stack>

      <VoiceInput /> */}
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <Login />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default App;
