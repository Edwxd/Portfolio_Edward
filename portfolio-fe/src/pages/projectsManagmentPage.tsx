import NavBar from "../components/NavBar/NavBar";
import "./homePage.css";
import ProjectManagment from "../adminManagment/Projects/projectManagment";

export default function HomePage() {
  return (
    <div>
      <NavBar />
      
      <div className="project-managment-container">
        <ProjectManagment/>
      </div>
  
      
      <footer>
        <p>© 2025 Edward_Nasser_Portfolio</p>
      </footer>
    </div>
  );
}
