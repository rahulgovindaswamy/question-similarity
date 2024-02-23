import { useState } from "react";
import SelectLabels from "../Dropdown/Dropdown";
import CustomMarks from "../Slider/Slider";

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
          <div className="px-2 mt-3">
            <div className="md:flex items-center justify-between text-[#374043] font-semibold">
              <div className="sm:w-2/3 w-full px-4">
                <div className="mb-2">Above Score</div>
                <div className="md:w-[500px] w-full">
                  <CustomMarks />
                </div>
              </div>
              <div className="sm:w-1/3 w-full">
                <div className="mb-1">Filter By</div>
                <div className="">
                  <SelectLabels />
                </div>
              </div>
            </div>
            <div className="text-sm px-4 py-4 text-[#374043] font-semibold opacity-80">
              Filter by Stem the calculation score is 10
            </div>
          </div>
        )}
      </div>
      <div className="bg-white rounded-sm mt-5 p-5 text-[#374043] font-semibold opacity-70">
        Please upload the question file in the first tab to check the Duplicate
        Questions.
      </div>
    </div>
  );
};

export default SimilarQuestions;
