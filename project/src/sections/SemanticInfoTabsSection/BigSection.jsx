import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Section3 from "../SemanticInfoSection";
import Section4 from "../CollocatesSection/Section4";
import TabSection from "../CollocatesTabsSection/TabSection";
import { useDispatch } from "react-redux";
import {
  updateCollocates,
  updateMeaning,
  updateSemantic_info,
  updateSemantic_info_obj,
} from "../../redux/userSlice";
import { IconButton, Stack } from "@mui/material";

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
  addFile,
  deleteFile,
}) {
  const dispach = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (arr && arr[newValue]) {
      if (arr[newValue].collocates !== undefined) {
        dispach(
          updateCollocates({
            arr: arr[newValue].collocates,
            collocatesIndex: null,
          })
        );
      }
      dispach(updateMeaning({ arr: arr[newValue].meaning }));
      dispach(
        updateSemantic_info_obj({
          name: "completed",
          value: arr[newValue].completed,
        })
      );
      dispach(
        updateSemantic_info_obj({
          name: "semantic_fields",
          value: arr[newValue].semantic_fields,
        })
      );
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {arr?.map((item, index) => (
            // <Stack direction={"row"} alignItems={"center"} key={index}>
            <Tab
              label={item.meaning?.text}
              {...a11yProps(index)}
              key={index}
              sx={{ fontSize: 25 }}
            />
            //   <IconButton>
            //     <ClearIcon />
            //   </IconButton>
            // </Stack>
          ))}
        </Tabs>
      </Box>
      {arr?.map((item, index) => {
        return (
          <CustomTabPanel value={value} index={index} key={index}>
            <>
              <Section3
                arr={item.meaning}
                Semantic_fields={item.semantic_fields}
                word={word}
                index={index}
                addFile={addFile}
              />
              <TabSection
                arr={item.collocates}
                value={value2}
                setValue={setValue2}
                setValue2={setValue}
                i={index}
                deleteFile={deleteFile}
              />
            </>
          </CustomTabPanel>
        );
      })}
    </Box>
  );
}
