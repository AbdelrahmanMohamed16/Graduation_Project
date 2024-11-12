import { createTheme, Grid2, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
import BigSection from "./sections/BigSection/BigSection";
import Section3 from "./sections/Section3";
import Navbar from "./components/Navbar/Navbar";

import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { getWord } from "./redux/userSlice";

function App() {
  const [value, setValue] = useState(-1);

  useEffect(() => {
    console.log("helllllllllo");
  });
  const handlePrint = () => {
    window.print();
  };
  const auth = useSelector((state) => state.user.auth);
  const semantic_info_arr = useSelector(
    (state) => state.user.form?.semantic_info
  );
  console.log(semantic_info_arr);
  const [word, setWord] = useState("المدخل");
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
            <Route path="/" element={<Login />} />
            {auth && (
              <>
                <Route
                  path="/words"
                  element={
                    <>
                      <Navbar
                        navItems={[
                          { text: " المعلومات الصوتيه", id: "section1" },
                          { text: "المعلومات الصرفيه", id: "section2" },
                          { text: " المعلومات الدلاليه", id: "section3" },
                          { text: "المتصاحبات اللفظية", id: "section4" },
                        ]}
                        setWord={setWord}
                        word={word}
                      >
                        {" "}
                      </Navbar>
                      <Grid2 container>
                        <Grid2 mx={4} my={3} width={"100%"}>
                          <Section1 word={word} />
                          <div className="no-print">
                            {" "}
                            <DividerComponent />
                          </div>
                          <Section2 />
                          <div className="no-print">
                            {" "}
                            <DividerComponent />
                          </div>
                          {semantic_info_arr?.length > 0 ? (
                            value === -1 ? (
                              <>
                                <BigSection
                                  arr={semantic_info_arr}
                                  value={value}
                                  setValue={setValue}
                                />
                                <div style={{ padding: 24 }}>
                                  {" "}
                                  <Section3 />
                                  <Section4 />
                                </div>
                              </>
                            ) : (
                              <BigSection
                                arr={semantic_info_arr}
                                value={value}
                                setValue={setValue}
                              />
                            )
                          ) : (
                            <>
                              <Section3 />
                              <Section4 />
                            </>
                          )}
                          <div className="no-print">
                            {" "}
                            <DividerComponent />
                          </div>
                          <LastSection />
                          <button onClick={handlePrint}>Print as PDF</button>
                        </Grid2>
                      </Grid2>
                    </>
                  }
                />
              </>
            )}

            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
