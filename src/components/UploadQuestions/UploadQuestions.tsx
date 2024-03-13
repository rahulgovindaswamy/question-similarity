import { useEffect, useState } from "react";
import Button from "../Button/Button";
import DataTable from "../DataTable/DataTable";
import Loader from "../Loader/Loader";
import SnackBar from "../SnackBar/SnackBar";

const columns = [
  { id: "SL.No", label: "SL. No", width: 150, align: "text-center" },
  { id: "Type", label: "Type", width: 250, align: "text-left" },
  {
    id: "Question",
    label: "Question",
    width: 600,
    align: "text-left",
  },
  {
    id: "Option 1",
    label: "Option 1",
    width: 150,
    align: "text-left",
  },
  {
    id: "Option 2",
    label: "Option 2",
    width: 150,
    align: "text-left",
  },
  {
    id: "Option 3",
    label: "Option 3",
    width: 150,
    align: "text-left",
  },
  {
    id: "Option 4",
    label: "Option 4",
    width: 150,
    align: "text-left",
  },
  {
    id: "preview",
    label: "Preview",
    width: 120,
    align: "text-center",
  },
];

const UploadQuestions = (props: any) => {
  const {
    isLoading,
    uploadFile,
    questionRowData,
    handleFileChange,
    nextPage,
    onClickPreviousPage,
    totalCount,
    page,
    removeFile,
  } = props;
  const [showBrowseFile, setShowBrowseFile] = useState(true);
  const [sortOrder, setSortOrder] = useState("ASC");
  const [sortBy, setSortBy] = useState("slNo");
  const [snackBarOpen, setSnackBarOpen] = useState({
    value: false,
    message: "",
    type: "",
  });

  const sorting = (sortOrder: string) => {
    let temp = "";
    if (sortOrder == "DESC") {
      temp = "ASC";
    } else {
      temp = "DESC";
    }
    return temp;
  };
  const sortData = (arg: string, columnId: string) => {
    setSortOrder(sorting(sortOrder));
    setSortBy(columnId);
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "Items-Sample.xlsx";
    link.download = "Items-Sample.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      {isLoading ? <Loader /> : null}
      <div className="sm:flex items-center justify-between">
        <div className="mt-5 text-[#374043]">
          <div className="text-xl font-semibold mb-1">
            Upload and View Question Bank
          </div>
          <div className="text-sm leading-relaxed opacity-80">
            You can upload your .xls/xlsx file here to view your question bank.
          </div>
        </div>
        <Button onClick={handleDownloadTemplate}>
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-cloud-arrow-down"></i>
            <div className="font-semibold">Download Template</div>
          </div>
        </Button>
      </div>
      <div className="bg-white p-5 rounded-sm my-5">
        <div className="flex items-center justify-between">
          <div className="text-[#374043] font-semibold opacity-80">
            Upload Questions
          </div>
          <i
            className={`${
              showBrowseFile ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"
            } cursor-pointer`}
            onClick={() => setShowBrowseFile(!showBrowseFile)}
          ></i>
        </div>
        {showBrowseFile && (
          <div>
            <div className="bg-[#F2F4F6] p-5 mt-3 rounded-sm">
              <label className="relative">
                <div className="sm:flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="34.375"
                      viewBox="0 0 50 34.375"
                    >
                      <path
                        id="Union_2"
                        data-name="Union 2"
                        d="M389.778,203.375H374.5a12.911,12.911,0,0,1-1.354-25.7A15.567,15.567,0,0,1,387,169a15.735,15.735,0,0,1,15.313,12.976,10.727,10.727,0,0,1-.729,21.4Zm11.805-4.3a6.448,6.448,0,0,0,0-12.891h-3.125v-1.074a11.421,11.421,0,0,0-22.479-3.223H374.5a8.6,8.6,0,0,0,0,17.187h10.278v-8.594h-5l7.425-7.734,7.575,7.734h-5v8.594Z"
                        transform="translate(-362 -169)"
                        fill="#5f6669"
                      />
                    </svg>
                    <div className="text-[#374043]">
                      <div className="text-md font-semibold mb-1 ">
                        Drag and drop audio file here
                      </div>
                      <div className="text-xs opacity-80">
                        Limit 200MB per file .XLS/XLSX
                      </div>
                    </div>
                  </div>
                  <div className="sm:mt-0 mt-2">
                    <Button>
                      <div className="flex items-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 30 24"
                        >
                          <path
                            id="Icon_material-folder-open"
                            data-name="Icon material-folder-open"
                            d="M30,9H18L15,6H6A3,3,0,0,0,3.015,9L3,27a3.009,3.009,0,0,0,3,3H30a3.009,3.009,0,0,0,3-3V12A3.009,3.009,0,0,0,30,9Zm0,18H6V12H30Z"
                            transform="translate(-3 -6)"
                            fill="#fff"
                          />
                        </svg>
                        <div className="font-semibold">Browse File</div>
                      </div>
                    </Button>
                  </div>
                </div>
                <input
                  type="file"
                  accept=".xls, .xlsx"
                  onChange={handleFileChange}
                  tabIndex={0}
                  onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
                    if (event.key === "Enter") {
                      handleFileChange;
                    }
                  }}
                  className="opacity-0 absolute w-full h-full top-0 cursor-pointer"
                />
              </label>
            </div>
            {uploadFile && (
              <div className="flex items-center justify-between mt-3 px-5">
                <div className="flex items-center space-x-2">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="27.5"
                      viewBox="0 0 22.5 27.5"
                    >
                      <g
                        id="Icon_feather-file"
                        data-name="Icon feather-file"
                        transform="translate(-4.75 -1.75)"
                      >
                        <path
                          id="Path_4"
                          data-name="Path 4"
                          d="M17.25,3H8.5A2.5,2.5,0,0,0,6,5.5v20A2.5,2.5,0,0,0,8.5,28h15A2.5,2.5,0,0,0,26,25.5V11.75Z"
                          fill="none"
                          stroke="#5f6669"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                        />
                        <path
                          id="Path_5"
                          data-name="Path 5"
                          d="M19.5,3V13.5H30"
                          transform="translate(-4)"
                          fill="none"
                          stroke="#5f6669"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                        />
                      </g>
                    </svg>
                  </div>
                  <div>{uploadFile.name}</div>
                </div>
                <div className="cursor-pointer" onClick={removeFile}>
                  <i className="fa-solid fa-xmark opacity-80"></i>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {questionRowData.length > 0 && (
        <DataTable
          rowData={questionRowData}
          columns={columns}
          hasTableActions={true}
          sortOrder={sortOrder}
          sortingHandling={sortData}
          sortingArray={[
            "slNo",
            "type",
            "question",
            "option1",
            "option2",
            "option3",
            "option4",
          ]}
          updatePageNumber={nextPage}
          previousPage={onClickPreviousPage}
          currentPage={page}
          paginationEnabled={true}
          tableHeader="Processed Results"
          totalRowsCount={totalCount}
          totalRowsCountPerPage={questionRowData.length}
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

export default UploadQuestions;
