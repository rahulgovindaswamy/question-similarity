import { useEffect, useState } from "react";
import SelectLabels from "../Dropdown/Dropdown";
import CustomMarks from "../Slider/Slider";
import DataTable from "../DataTable/DataTable";
import axiosinstance from "../../services/axiosInstane";
import Loader from "../Loader/Loader";
import SnackBar from "../SnackBar/SnackBar";
import { snackbarColor } from "../../config/constants";

const columns = [
  {
    id: "sl_no",
    label: "SL. No",
    width: 100,
    align: "text-left",
  },
  {
    id: "question",
    label: "Question Stem",
    width: 600,
    align: "text-left",
  },
  {
    id: "similar_cnt",
    label: "Count",
    width: 100,
    align: "text-center",
  },
  { id: "view", label: "View", width: 100, align: "text-center" },
];

const SimilarQuestions = () => {
  const [showFilterOption, setShowFilterOption] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [similarQuestionRequest, setSimilarQuestionRequest] = useState({
    userId: "278398ba-fc29-41fb-a13b-84623820b388",
    value: 0,
    filterOption: "stem",
    pageNumber: page,
    pageSize: 20,
  });
  const [totalCount, setTotalCount] = useState();
  const [snackBarOpen, setSnackBarOpen] = useState({
    value: false,
    message: "",
    type: "",
  });

  const similarQuestion = (requestObj: any) => {
    setIsLoading(true);
    axiosinstance
      .get(
        `CheckSimilarQuestion?UserId=${requestObj.userId}&Score=${requestObj.value}&FilterBy=${requestObj.filterOption}&PageNo=${requestObj.pageNumber}&PageSize=${requestObj.pageSize}`
      )
      .then((response) => {
        if (response.status === 200) {
          setRowData(response.data.similar_question);
          setTotalCount(response.data.total_count);
          setSnackBarOpen({
            ...snackBarOpen,
            value: true,
            message: "Successful",
            type: snackbarColor.success,
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setSnackBarOpen({
          ...snackBarOpen,
          value: true,
          message: "Something went wrong",
          type: snackbarColor.error,
        });
        setIsLoading(false);
      });
  };

  const handleDropdownChange = (event: any) => {
    setSimilarQuestionRequest({
      ...similarQuestionRequest,
      filterOption: event.target.value,
    });
    if (similarQuestionRequest.value > 0) {
      similarQuestion({
        ...similarQuestionRequest,
        filterOption: event.target.value,
      });
    }
  };

  const handleSliderChange = (_: Event, newValue: number) => {
    setSimilarQuestionRequest({ ...similarQuestionRequest, value: newValue });
    similarQuestion({ ...similarQuestionRequest, value: newValue });
  };
  const nextPage = () => {
    setIsLoading(true);
    similarQuestion({ ...similarQuestionRequest, pageNumber: page + 1 });
    setPage(page + 1);
  };

  const onClickPreviousPage = () => {
    setIsLoading(true);
    similarQuestion({ ...similarQuestionRequest, pageNumber: page - 1 });
    setPage(page - 1);
  };

  return (
    <div className="w-full">
      {isLoading ? <Loader /> : null}
      <div className="mt-5 text-[#374043]">
        <div className="text-xl font-semibold mb-1">View Similar Questions</div>
        <div className="text-sm leading-relaxed opacity-80">
          Filter the similar questions by Stem, Type, and Options matching
          scores
        </div>
      </div>
      <div className="bg-white rounded-sm my-5">
        <div className="px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="text-[#374043] font-semibold">Filter options</div>
            <i
              className={`${
                showFilterOption
                  ? "fa-solid fa-angle-up"
                  : "fa-solid fa-angle-down"
              } cursor-pointer`}
              onClick={() => setShowFilterOption(!showFilterOption)}
            ></i>
          </div>
        </div>
        <div className="h-[1px] bg-gray-300"></div>
        {showFilterOption && (
          <div className="px-4 mt-3">
            <div className="w-full lg:flex items-center justify-between text-[#374043] font-semibold">
              <div className="lg:w-1/2 w-full">
                <div className="mb-2">Above Score</div>
                <CustomMarks
                  handleChange={handleSliderChange}
                  value={similarQuestionRequest.value}
                />
              </div>
              <div className="lg:w-1/4 w-full ">
                <div className="mb-1">Filter By</div>
                <SelectLabels handleChange={handleDropdownChange} />
              </div>
            </div>
            <div className="text-sm px-4 py-4 text-[#374043] font-semibold opacity-80">
              {`Filter by "${similarQuestionRequest.filterOption}". The calculation
              score is ${similarQuestionRequest.value}`}
            </div>
          </div>
        )}
      </div>
      {/* <div className="bg-white rounded-sm mt-5 p-5 text-[#374043] font-semibold opacity-70 mb-5">
        Please upload the question file in the first tab to check the Duplicate
        Questions.
        Similarity on Question Stem:
      </div> */}
      {rowData.length > 0 && (
        <DataTable
          rowData={rowData}
          columns={columns}
          hasTableActions={false}
          paginationEnabled={true}
          tableHeader="Similarity on Question Stem:"
          updatePageNumber={nextPage}
          previousPage={onClickPreviousPage}
          currentPage={page}
          totalRowsCount={totalCount}
          totalRowsCountPerPage={rowData.length}
        />
      )}

      <SnackBar
        isOpen={snackBarOpen.value}
        handleClose={() => setSnackBarOpen({ ...snackBarOpen, value: false })}
        message={snackBarOpen.message}
        type={snackBarOpen.type}
      />
    </div>
  );
};

export default SimilarQuestions;
