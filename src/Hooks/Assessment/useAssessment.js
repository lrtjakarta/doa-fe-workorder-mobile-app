import { AssesmentContext } from "Context";
import { useWorkOrder } from "Context/WorkOrder";
import { useContext, useState } from "react";

export default function useAssessment() {
  const [searchText, setSearchText] = useState("");
  const [assessmentStatus, setAssessmentStatus] = useState("");
  const {
    dateAssessment,
    setDateAssessment,
    getDataAssessment,
    assessment,
    filterAssessment,
    setFilterAssessment,
    getDetailAssessment,
  } = useContext(AssesmentContext);

  const { profileById } = useWorkOrder();

  const handleFilterDate = (event) => {
    setDateAssessment(event.target.value);
    let createAt = event.target.value;
    let createBy = profileById?.idNumber;

    getDataAssessment(createBy, createAt);
  };

  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };

  const filterData = (value) => {
    var searchQuery = value.toString().toLowerCase();
    let filtertext = assessment.filter(
      (item) =>
        item?.createBy?.name.toString().toLowerCase().indexOf(searchQuery) !==
        -1
    );
    setFilterAssessment(filtertext);
  };
  const handleFilterAssessmentStatus = (value) => {
    setAssessmentStatus(value);
    if (value !== "10") {
      const resFilter = assessment.filter((item) => item?.status === value);
      setFilterAssessment(resFilter);
    } else {
      setFilterAssessment(assessment);
    }
  };

  return {
    getDataAssessment,
    assessment,
    filterAssessment,
    handleFilterAssessmentStatus,
    dateAssessment,
    setDateAssessment,
    getDetailAssessment,
    assessmentStatus,
    setAssessmentStatus,
    handleFilterDate,
    searchText,
    handleChange,
  };
}
