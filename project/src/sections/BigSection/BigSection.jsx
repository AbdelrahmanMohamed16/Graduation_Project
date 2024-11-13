import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Section3 from "../Section3";
import Section4 from "../Section4/Section4";
import TabSection from "../TabSection/TabSection";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({
  arr,
  value,
  setValue,
  word,
  value2,
  setValue2,
}) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("----------= simintic array =--------------", arr);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {arr?.map((item, index) => (
            <Tab label={item.meaning.text} key={index} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {arr?.map((item, index) => {
        return (
          <CustomTabPanel value={value} index={index}>
            <>
              <Section3
                arr={item.meaning}
                Semantic_fields={item.Semantic_fields}
                word={word}
              />
              <TabSection
                arr={item.collocates}
                value={value2}
                setValue={setValue2}
                setValue2={setValue}
              />
            </>
          </CustomTabPanel>
        );
      })}
    </Box>
  );
}
