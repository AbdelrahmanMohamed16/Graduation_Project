import React, { useState, useEffect } from "react";
import { Grid2, Typography } from "@mui/material";

import Section1 from "../../sections/DiacriticsSection";
import ExampleSection from "../../sections/FunctionalExampleSection/ExampleSection";
import LastSection from "../../sections/FunctionalLastSection/LastSection";
import DividerComponent from "../../components/Divider/DividerComponent";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../redux/userSlice";

export default function FunctionalPage(props) {
  const form = useSelector((state) => state.user.form);

  const [files, setFiles] = useState([]);
  const [records, setRecords] = useState([]);
  const [examples1, setExamples1] = useState([
    { id: Date.now(), text: "", source: "" },
  ]);
  const [examples2, setExamples2] = useState([
    { id: Date.now(), text: "", source: "" },
  ]);
  const [examples3, setExamples3] = useState([
    { id: Date.now(), text: "", source: "" },
  ]);
  useEffect(() => {
    console.log(form);
    if (form.linguistic_function) {
      setExamples1(form.linguistic_function.example);
    }
    if (form.contextual_indicators) {
      setExamples2(form.contextual_indicators.example);
    }
    if (form.syntactic_collocation) {
      setExamples3(form.syntactic_collocation.example);
    }
  }, [form]);
  const dispatch = useDispatch();
  // Function to handle changes in example fields
  const handleExampleChange = (setExamples) => (id, field, value) => {
    setExamples((prev) =>
      prev?.map((example) =>
        example.id === id ? { ...example, [field]: value } : example
      )
    );
  };
  // useEffect(() => {
  //   dispatch(
  //     updateForm({ name: "linguistic_function", value: { example: examples1 } })
  //   );
  // }, [dispatch, examples1]);
  // useEffect(() => {
  //   dispatch(
  //     updateForm({
  //       name: "contextual_indicators",
  //       value: { example: examples2 },
  //     })
  //   );
  // }, [dispatch, examples2]);
  // useEffect(() => {
  //   dispatch(
  //     updateForm({
  //       name: "syntactic_collocation",
  //       value: { example: examples3 },
  //     })
  //   );
  // }, [dispatch, examples3]);

  // Function to add a new example
  const addNewExample = (setExamples) => () => {
    setExamples((prev) => [...prev, { id: Date.now(), text: "", source: "" }]);
    console.log("i added new example");
  };

  // Smooth scrolling logic using event delegation
  useEffect(() => {
    const handleNavbarClick = (event) => {
      const target = event.target;
      const sectionId = target.getAttribute("data-id");
      if (sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleNavbarClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleNavbarClick);
    };
  }, []);

  return (
    <Grid2 container>
      <Grid2 mx={4} my={3} width={"100%"}>
        {/* Section 1 */}
        <section id="section1">
          <Section1 word={props.word} />
        </section>

        {/* Section 2 */}
        <section id="section2">
          <div className="no-print">
            <DividerComponent />
          </div>

          <Typography
            variant="h6"
            fontWeight={"bold"}
            fontFamily={"El Messiri"}
            color="#0F2D4D"
          >
            الوظيفة اللغوية:
          </Typography>
          <ExampleSection
            examples={examples1}
            onChange={handleExampleChange(setExamples1)}
            addExample={addNewExample(setExamples1)}
          />
        </section>

        {/* Section 3 */}
        <section id="section3">
          <div className="no-print">
            <DividerComponent />
          </div>

          <Typography
            variant="h6"
            fontWeight={"bold"}
            fontFamily={"El Messiri"}
            color="#0F2D4D"
          >
            الدلالة السياقية:
          </Typography>
          <ExampleSection
            examples={examples2}
            onChange={handleExampleChange(setExamples2)}
            addExample={addNewExample(setExamples2)}
          />
        </section>

        {/* Section 4 */}
        <section id="section4">
          <div className="no-print">
            <DividerComponent />
          </div>

          <Typography
            variant="h6"
            fontWeight={"bold"}
            fontFamily={"El Messiri"}
            color="#0F2D4D"
          >
            التصاحب التركيبي:
          </Typography>
          <ExampleSection
            examples={examples3}
            onChange={handleExampleChange(setExamples3)}
            addExample={addNewExample(setExamples3)}
          />
        </section>

        <div className="no-print">
          <DividerComponent />
        </div>

        {/* Last Section */}
        <LastSection
          files={files}
          records={records}
          Functional={true}
          ex1={examples1}
          ex2={examples2}
          ex3={examples3}
        />
      </Grid2>
    </Grid2>
  );
}
