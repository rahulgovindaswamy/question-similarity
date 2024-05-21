import { useState } from "react";
import Button from "../Button/Button";
import SearchInput from "../Input/Input";
import DataTable from "../DataTable/DataTable";
import axiosinstance from "../../services/axiosInstane";
import Loader from "../Loader/Loader";
import SnackBar from "../SnackBar/SnackBar";
import { snackbarColor } from "../../config/constants";

const columns = [
  { id: "sl.no", label: "SL. No", width: 50, align: "text-center" },
  {
    id: "question",
    label: "Question Stem",
    width: 600,
    align: "text-left",
  },
  { id: "score", label: "Score", width: 50, align: "text-center" },
];

const SearchSimilarQuestions = () => {
  const [questionStem, setQuestionStem] = useState("");
  const [userId, setUserId] = useState("278398ba-fc29-41fb-a13b-84623820b388");
  const [rowData, setRowData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState({
    value: false,
    message: "",
    type: "",
  });

  const checkSimilarQuestion = () => {
    setIsLoading(true);
    axiosinstance
      .get(`CheckSimilarQuestion?UserId=${userId}&SearchedText=${questionStem}`)
      .then((response) => {
        if (response.status === 200) {
          setRowData(response.data.searched_data);
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
  return (
    <div className="w-full">
      {isLoading ? <Loader /> : null}
      <div className="mt-5 text-[#374043]">
        <div className="text-xl font-semibold mb-1">Find Similar Questions</div>
        <div className="text-sm leading-relaxed opacity-80">
          Input the Question to find similar questions.
        </div>
      </div>
      <div className="w-full bg-white rounded-sm my-5">
        <div className="p-5">
          <div className="text-[#374043] font-semibold opacity-70">
            Enter the Question Stem
          </div>
          <div className="md:flex items-center md:space-x-4 mt-3">
            <div>
              <SearchInput
                type="text"
                value={questionStem}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuestionStem(e.target.value)
                }
                onClearSearch={() => setQuestionStem("")}
                showClear={true}
              />
            </div>
            <Button
              onClick={checkSimilarQuestion}
              disable={questionStem === ""}
            >
              <div className="flex items-center space-x-2">
                <div>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <div className="text-md font-semibold">Check Similarity</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
      {/* <div className="w-full bg-white rounded-sm mt-5 p-5 text-[#374043] font-semibold opacity-70 mb-5">
        Similarity on Question Stem (Search):
      </div> */}
      {rowData.length > 0 && (
        <DataTable
          rowData={rowData}
          columns={columns}
          hasTableActions={false}
          paginationEnabled={false}
          tableHeader="Similarity on Question Stem (Search):"
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

export default SearchSimilarQuestions;
