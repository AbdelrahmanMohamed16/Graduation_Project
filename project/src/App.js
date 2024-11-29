import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import AccordionWithWords from "./pages/FirstPage/FirstPage";
import NounsPage from "./pages/NounsPage/NounsPage";
import { useDispatch, useSelector } from "react-redux";
import { clearForm } from "./redux/userSlice";

function App() {
  const [word, setWord] = useState("المدخل");
  const auth = useSelector((state) => state.user.auth);
  const text = useSelector((state) => state.user.form.text);
  const dispatch = useDispatch();
  useEffect(() => {
    setWord(text ? text : "المدخل");
  }, [text]);
  useEffect(() => {
    console.log("word length ======> ", word.length);
    if (word.length === 0) dispatch(clearForm());
  }, [word]);
  console.log("word======> ", word);
  console.log("text======> ", text);
  const theme = createTheme({
    direction: "rtl",
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
                  path="/firstPage"
                  element={
                    <>
                      <Navbar first={true}></Navbar>
                      <AccordionWithWords />
                    </>
                  }
                />
                <>
                  <Route
                    path="/nounpage"
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
                        ></Navbar>
                        {/* <Grid2 container>
                        <Grid2 mx={4} my={3} width={"100%"}>
                          <Section1 word={word} addRecord={addRecord} />
                          <div className="no-print">
                            {" "}
                            <DividerComponent />
                          </div>
                          <Section2 />
                          <div className="no-print">
                            <DividerComponent />
                          </div>
                          {semantic_info_arr?.length > 0 ? (
                            value === -1 ? (
                              <>
                                {console.log(semantic_info_arr)}
                                <BigSection
                                  arr={semantic_info_arr}
                                  value={value}
                                  setValue={setValue}
                                  value2={value2}
                                  setValue2={setValue2}
                                  addFile={addFile}
                                />
                                <div style={{ padding: 24 }}>
                                  {" "}
                                  <Section3 addFile={addFile} />
                                  <TabSection
                                    value={value2}
                                    setValue={setValue2}
                                    setValue2={setValue}
                                  />
                                </div>
                              </>
                            ) : (
                              <BigSection
                                arr={semantic_info_arr}
                                value={value}
                                setValue={setValue}
                                addFile={addFile}
                                value2={value2}
                                setValue2={setValue2}
                              />
                            )
                          ) : (
                            <>
                              <Section3 addFile={addFile} />
                              <TabSection
                                value={value2}
                                value1={value}
                                setValue={setValue2}
                                setValue2={setValue}
                              />
                            </>
                          )}
                          <div className="no-print">
                            {" "}
                            <DividerComponent />
                          </div>
                          <LastSection files={files} records={records} />
                        </Grid2>
                      </Grid2> */}
                        <NounsPage word={word} />
                      </>
                    }
                  />
                </>
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
