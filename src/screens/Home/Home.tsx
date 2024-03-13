import Tabs from "../../components/Tabs/Tabs";
import logo from "../../assets/ES-logo.svg";
import wave from "../../assets/wave.png";
import { useRef, useState } from "react";
import UploadQuestions from "../../components/UploadQuestions/UploadQuestions";
import SimilarQuestions from "../../components/SimilarQuestions/SimilarQuestions";
import SearchSimilarQuestions from "../../components/SearchSimilarQuestions/SearchSimilarQuestions";
import SnackBar from "../../components/SnackBar/SnackBar";
import axiosinstance from "../../services/axiosInstane";
import { snackbarColor } from "../../config/constants";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const binaryData = useRef<any>();
  const [questionRowData, setQuestionRowData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [questionRequest, setQuestionRequest] = useState({
    userId: "278398ba-fc29-41fb-a13b-84623820b388",
    pageNumber: page,
    pageSize: 20,
  });
  const [snackBarOpen, setSnackBarOpen] = useState({
    value: false,
    message: "",
    type: "",
  });
  const [totalCount, setTotalCount] = useState();

  const getQuestionData = (requestObj: any) => {
    axiosinstance
      .get(
        `/GetQuestionData?UserId=${requestObj.userId}&PageNo=${requestObj.pageNumber}&PageSize=${requestObj.pageSize}`
      )
      .then((response) => {
        if (response.status === 200) {
          setQuestionRowData(response.data.excel_data);
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
      .catch((err: any) => {
        setSnackBarOpen({
          ...snackBarOpen,
          value: true,
          message: "Something went wrong",
          type: snackbarColor.error,
        });
        setIsLoading(false);
      });
  };

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64Result = reader.result;
        if (typeof base64Result === "string") {
          const base64String = base64Result.split(",")[1];
          binaryData.current = base64String;
        } else {
          console.error("Error: FileReader result is not a string");
        }
        resolve(base64Result);
      };
      reader.onerror = (error) => {
        console.error("Error reading the file:", error);
        reject(error);
      };
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsLoading(true);
    const file = event.target.files && event.target.files?.[0];
    if (file) {
      await convertToBase64(file);
    }
    const formData = new FormData();
    formData.append("BinaryFileData", binaryData.current);
    formData.append("UserId", questionRequest.userId);
    axiosinstance
      .post("/SaveBinaryData", formData)
      .then((response) => {
        if (response.status === 200) {
          getQuestionData(questionRequest);
        }
      })
      .catch((err: any) => {
        console.log(err);
        setIsLoading(false);
      });
    setUploadFile(file);
  };

  const nextPage = () => {
    setIsLoading(true);
    getQuestionData({ ...questionRequest, pageNumber: page + 1 });
    setPage(page + 1);
  };

  const onClickPreviousPage = () => {
    setIsLoading(true);
    getQuestionData({ ...questionRequest, pageNumber: page - 1 });
    setPage(page - 1);
  };

  const handleTabChange = (tabIndex: number) => {
    setActiveIndex(tabIndex);
  };

  const onFileRemove = () => {
    setUploadFile(null);
  };

  return (
    <div className="landing-page-container min-h-screen">
      <div className="header-container pl-8 h-16 bg-white flex justify-between items-center">
        <img src={logo} alt="logo" aria-label="logo" width={160} />
        <img
          src={wave}
          alt="wave"
          aria-label="wave"
          className="h-fit sm:w-[200px] w-[160px]"
        />
      </div>
      <div className="sm:px-10 xs:px-8 px-6 xs:py-6 py-4 bg-[#F2F4F6] min-h-[calc(100vh_-_64px)] md:px-24">
        <Tabs
          activeItem={activeIndex}
          onTabChange={(tabIndex) => {
            handleTabChange(tabIndex);
          }}
        />
        {activeIndex === 0 && (
          <UploadQuestions
            isLoading={isLoading}
            uploadFile={uploadFile}
            questionRowData={questionRowData}
            handleFileChange={handleFileChange}
            nextPage={nextPage}
            onClickPreviousPage={onClickPreviousPage}
            totalCount={totalCount}
            page={page}
            removeFile={onFileRemove}
          />
        )}
        {activeIndex === 1 && <SimilarQuestions />}
        {activeIndex === 2 && <SearchSimilarQuestions />}
      </div>
      <SnackBar
        isOpen={snackBarOpen.value}
        handleClose={() => setSnackBarOpen({ ...snackBarOpen, value: false })}
        message={snackBarOpen.message}
        type={snackBarOpen.type}
      />
    </div>
  );
};

export default Home;
