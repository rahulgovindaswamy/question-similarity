import { useState } from "react";
import Button from "../Button/Button";
import SearchInput from "../Input/Input";
import DataTable from "../DataTable/DataTable";

const rowData: any = [
  {
    question: "A very strong wind is called",
    score: 7.2,
    slNo: 12,
  },
  {
    question: "A soft wind is called breeze",
    score: 5.2,
    slNo: 14,
  },
  {
    question: "Integrated system that helps you build embedded",
    score: 7.2,
    slNo: 15,
  },
  {
    question: "Play Music is no longer available",
    score: 9.0,
    slNo: 89,
  },
];
const columns = [
  { id: "slNo", label: "SL. No", width: 100, align: "text-center" },
  {
    id: "question",
    label: "Question Stem",
    width: 600,
    align: "text-left",
  },
  { id: "score", label: "Score", width: 100, align: "text-center" },
];

const SearchSimilarQuestions = () => {
  const [questionStem, setQuestionStem] = useState("");
  return (
    <div className="w-full">
      <div className="mt-5 text-[#374043]">
        <div className="text-xl font-semibold mb-1">Find Similar Questions</div>
        <div className="text-sm leading-relaxed opacity-80">
          Input the Question to find similar questions.
        </div>
      </div>
      <div className="w-full bg-white rounded-sm mt-5">
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
            <Button>
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
      <div className="w-full bg-white rounded-sm mt-5 p-5 text-[#374043] font-semibold opacity-70 mb-5">
        {/* Please enter a search query before checking similarity. */}
        Similarity on Question Stem (Search):
      </div>
      <DataTable rowData={rowData} columns={columns} hasTableActions={false} />
    </div>
  );
};

export default SearchSimilarQuestions;
