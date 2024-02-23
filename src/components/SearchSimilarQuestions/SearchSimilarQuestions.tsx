import { useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import SearchInput from "../Input/Input";

const SearchSimilarQuestions = () => {
  const [questionStem, setQuestionStem] = useState("");
  return (
    <div className="w-full">
      <div className="mt-5 text-[#374043]">
        <div className="text-xl font-semibold">Find Similar Questions</div>
        <div className="text-sm leading-relaxed">
          Input the Question to find similar questions.
        </div>
      </div>
      <div className="w-full bg-white rounded-sm mt-5">
        <div className="p-5">
          <div className="text-[#374043] font-semibold">
            Enter the Question Stem
          </div>
          <div className="sm:flex items-center sm:space-x-4 mt-3">
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
                <div className="sm:block hidden text-md font-semibold">
                  Check Similarity
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full bg-white rounded-sm mt-5 p-5 text-[#374043] font-semibold">
        Please enter a search query before checking similarity.
      </div>
    </div>
  );
};

export default SearchSimilarQuestions;
