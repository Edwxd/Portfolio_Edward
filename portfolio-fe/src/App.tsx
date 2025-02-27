import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import ProjectManagmentPage from "./pages/projectsManagmentPage";
import CommentReviewPage from "./pages/commentReviewPage";
import BiographyEditForm from "./pages/biographyManagementPage";
import ContactInfoEditPage from "./pages/contactInfoManagmentPage";
import ProtectedRoute from "./AuthService/protectedRoutes";




const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
           <Route element={<ProtectedRoute />}>
           <Route path="/manage-projects" element={<ProjectManagmentPage />} />
              <Route path="/manage-biography" element={<BiographyEditForm />} />
              <Route path="/manage-contact-info" element={<ContactInfoEditPage />} />
              <Route path="/comments" element={<CommentReviewPage />} />
           </Route>
          
        </Routes>
      </Router>
      

    </div>
  );
};

export default App;
