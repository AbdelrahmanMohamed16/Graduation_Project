import React, { useState, useEffect } from "react";
import { Grid2, Typography } from "@mui/material";

import Section1 from "../../sections/DiacriticsSection";
import ExampleSection from "../../sections/FunctionalExampleSection/ExampleSection";
import LastSection from "../../sections/FunctionalLastSection/LastSection";
import DividerComponent from "../../components/Divider/DividerComponent";

export default function FunctionalPage(props) {
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

  // Function to handle changes in example fields
  const handleExampleChange = (setExamples) => (id, field, value) => {
    setExamples((prev) =>
      prev.map((example) =>
        example.id === id ? { ...example, [field]: value } : example
      )
    );
  };

  // Function to add a new example
  const addNewExample = (setExamples) => () => {
    setExamples((prev) => [...prev, { id: Date.now(), text: "", source: "" }]);
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
          <Section1 />
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
        <LastSection files={files} records={records} />
      </Grid2>
    </Grid2>
  );
}
