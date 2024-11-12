import { createTheme, Grid2, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import Login from "./pages/Login";
import Section2 from "./sections/section2/Section2";
import Section4 from "./sections/Section4/Section4";
import LastSection from "./sections/lastSection/LastSection";
import Section1 from "./sections/Section1";
import DividerComponent from "./components/Divider/DividerComponent";
import Section3 from "./sections/Section3";
import Navbar from "./components/Navbar/Navbar";

import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

function App() {
  const auth = useSelector((state) => state.user.auth);
  const [word, setWord] = useState("المدخل");
  const timeSpentRef = useRef(0); // Use ref to store the time spent

  const [totalTimeSpent, setTotalTimeSpent] = useState(0); // Display time in UI

  useEffect(() => {
    const interval = setInterval(() => {
      timeSpentRef.current += 1; // Increment time spent without re-rendering
      setTotalTimeSpent(timeSpentRef.current); // Update UI with the new time
    }, 1000);
    return () => clearInterval(interval);
  }, []); // Only run once, when the component mounts

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
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar
                    navItems={[
                      { text: " المعلومات الصوتيه", id: "section1" },
                      { text: "المعلومات الصرفيه", id: "section2" },
                      { text: " المعلومات الدلاليه", id: "section3" },
                    ]}
                    setWord={setWord}
                  />
                  <Grid2 container>
                    <Grid2 mx={4} my={3} width={"100%"}>
                      <Section1 word={word} />
                      <DividerComponent />
                      <Section2 />
                      <DividerComponent />
                      <Section3 />
                      <DividerComponent />
                      <Section4 />
                      <DividerComponent />
                      <LastSection totalTimeSpent={totalTimeSpent} />
                    </Grid2>
                  </Grid2>
                </>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
