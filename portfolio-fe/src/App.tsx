import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import ProjectManagmentPage from "./pages/projectsManagmentPage";
import CommentReviewPage from "./pages/commentReviewPage";
import BiographyEditForm from "./pages/biographyManagementPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manage-projects" element={<ProjectManagmentPage />} />
        <Route path="/manage-biography" element={<BiographyEditForm />} />
        {/* <Route path="/manage-contact" element={<ContactManagmentPage />} /> */}
        <Route path="/comments" element={<CommentReviewPage />} />
      </Routes>
    </Router>
  );
};

export default App;
