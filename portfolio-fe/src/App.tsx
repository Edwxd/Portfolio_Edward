import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import ProjectManagmentPage from "./pages/projectsManagmentPage";
import CommentReviewPage from "./pages/commentReviewPage";
import BiographyEditForm from "./pages/biographyManagementPage";
import ContactInfoEditPage from "./pages/contactInfoManagmentPage";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manage-projects" element={<ProjectManagmentPage />} />
        <Route path="/manage-biography" element={<BiographyEditForm />} />
        <Route path="/manage-contact-info" element={<ContactInfoEditPage />} />
        <Route path="/comments" element={<CommentReviewPage />} />
      </Routes>
    </Router>
  );
};

export default App;
