import { BrowserRouter, Route, Routes } from "react-router-dom";
import UploadQuestions from "./screens/UploadQuestions/UploadQuestions";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UploadQuestions />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
