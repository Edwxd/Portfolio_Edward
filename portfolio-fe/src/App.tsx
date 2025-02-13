import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import ProjectManagmentPage from "./pages/projectsManagmentPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manage-projects" element={<ProjectManagmentPage />} />
      </Routes>
    </Router>
  );
};

export default App;
