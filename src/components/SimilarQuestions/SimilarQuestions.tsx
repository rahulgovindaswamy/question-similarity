import { useState } from "react";
import SelectLabels from "../Dropdown/Dropdown";
import CustomMarks from "../Slider/Slider";
import DataTable from "../DataTable/DataTable";

const rowData: any = [
  {
    question: "A very strong wind is called",
    relatedCount: 3,
    score: 7.2,
    slNo: 12,
  },
  {
    question: "A soft wind is called breeze",
    relatedCount: 4,
    score: 5.2,
    slNo: 14,
  },
  {
    question: "Integrated system that helps you build embedded",
    relatedCount: 3,
    score: 7.2,
    slNo: 15,
  },
  {
    question: "Play Music is no longer available",
    relatedCount: 4,
    score: 9.0,
    slNo: 89,
  },
];
const columns = [
  { id: "slNo", label: "Excel Row No.", width: 150, align: "text-center" },
  {
    id: "question",
    label: "Question Steam",
    width: 600,
    align: "text-left",
  },
  { id: "score", label: "Score", width: 100, align: "text-center" },
  {
    id: "relatedCount",
    label: "Related Count",
    width: 120,
    align: "text-center",
  },
  { id: "view", label: "View", width: 100, align: "text-center" },
];

const SimilarQuestions = () => {
  const [showFilterOption, setShowFilterOption] = useState(true);

  return (
    <div className="w-full">
      <div className="mt-5 text-[#374043]">
        <div className="text-xl font-semibold mb-1">View Similar Questions</div>
        <div className="text-sm leading-relaxed opacity-80">
          Filter the similar questions by Stem, Type, and Options matching
          scores
        </div>
      </div>
      <div className="bg-white rounded-sm mt-5">
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
                <CustomMarks />
              </div>
              <div className="lg:w-1/4 w-full ">
                <div className="mb-1">Filter By</div>
                <SelectLabels />
              </div>
            </div>
            <div className="text-sm px-4 py-4 text-[#374043] font-semibold opacity-80">
              Filter by Stem the calculation score is 10
            </div>
          </div>
        )}
      </div>
      <div className="bg-white rounded-sm mt-5 p-5 text-[#374043] font-semibold opacity-70 mb-5">
        {/* Please upload the question file in the first tab to check the Duplicate
        Questions. */}
        Similarity on Question Stem:
      </div>
      <DataTable rowData={rowData} columns={columns} hasTableActions={false} />
    </div>
  );
};

export default SimilarQuestions;
