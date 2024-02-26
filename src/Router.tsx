import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home/Home";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.REACT_APP_SUBDIRECTORY}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
