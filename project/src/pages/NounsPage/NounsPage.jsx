import { Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import Section1 from "../../sections/DiacriticsSection";
import DividerComponent from "../../components/Divider/DividerComponent";
import Section3 from "../../sections/SemanticInfoSection";
import BigSection from "../../sections/SemanticInfoTabsSection/BigSection";
import TabSection from "../../sections/CollocatesTabsSection/TabSection";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../LoadingPage/LoadingPage";
import Swal from "sweetalert2";
import { clearSavedState } from "../../redux/userSlice";
import Section2 from "../../sections/NounsMorphologicalsSection/Section2";
import LastSection from "../../sections/FormControlSection/LastSection";

export default function NounsPage(props) {
  const [value, setValue] = useState(-1);
  const [value2, setValue2] = useState(-1);
  const [files, setFiles] = useState([]);
  const [records, setRecords] = useState([]);
  const saveDone = useSelector((state) => state.user.saved);
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.word === "") {
      setFiles([]);
      setFiles([]);
    }
  }, [props?.word]);
  useEffect(() => {
    if (saveDone) {
      Swal.fire({
        title: "تم الحفظ بنجاح!",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
    }
    dispatch(clearSavedState());
  }, [saveDone]);

  const addFile = (file, index) => {
    if (index !== undefined && index < files.length) {
      const updatedFiles = [...files];
      if (file.image) {
        updatedFiles[index].image = file.image;
      } else {
        updatedFiles[index].image = file;
      }
      setFiles(updatedFiles);
    } else {
      setFiles([...files, { image: file, index: files.length }]);
    }
  };

  const addRecord = (record, index) => {
    if (index !== undefined && index < records.length) {
      const updatedRecords = [...records];
      updatedRecords[index] = record;
      setRecords(updatedRecords);
    } else {
      setRecords([...records, record]);
    }
  };

  const deleteRecord = (index) => {
    console.log("index on delete record", index);
    if (index !== undefined && index < records.length) {
      setRecords(() => records.filter((record) => record !== records[index]));
    }
    console.log("records after delete", records);
  };

  const deleteFile = (index) => {
    console.log("index on delete files", index);
    if (index !== undefined && index < files.length) {
      setFiles(() => files.filter((file) => file !== files[index]));
    }
    console.log("files after delete", records);
  };

  const semantic_info = useSelector((state) => state.user.semantic_info);
  const isLoading = useSelector((state) => state.user.pageLoading);
  const [semantic_info_arr, setSemantic_info_arr] = useState(
    semantic_info || {}
  );
  console.log(semantic_info);
  useEffect(() => {
    setSemantic_info_arr(semantic_info);
  }, [semantic_info]);
  return (
    <Grid2 container>
      {isLoading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <Grid2 mx={4} my={3} width={"100%"}>
          <Section1
            word={props.word}
            addRecord={addRecord}
            deleteRecord={deleteRecord}
          />
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
                <BigSection
                  arr={semantic_info_arr}
                  value={value}
                  setValue={setValue}
                  value2={value2}
                  setValue2={setValue2}
                  addFile={addFile}
                  deleteFile={deleteFile}
                />
                <div style={{ padding: 24 }}>
                  {" "}
                  <Section3 addFile={addFile} deleteFile={deleteFile} />
                  <TabSection
                    value={value2}
                    setValue={setValue2}
                    setValue2={setValue}
                    deleteFile={deleteFile}
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
                deleteFile={deleteFile}
              />
            )
          ) : (
            <>
              <Section3 addFile={addFile} deleteFile={deleteFile} />
              <TabSection
                value={value2}
                value1={value}
                setValue={setValue2}
                setValue2={setValue}
                deleteFile={deleteFile}
              />
            </>
          )}
          <div className="no-print">
            {" "}
            <DividerComponent />
          </div>
          <LastSection
            files={files}
            records={records}
            virb={true}
            value={value}
            value2={value2}
            setFiles={setFiles}
            setRecords={setRecords}
          />
        </Grid2>
      )}
    </Grid2>
  );
}
