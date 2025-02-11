import BiographyForm from "../components/BiographyForm/biographyFormBox";
import ContactInfoBox from "../components/ContactInfo/contactInfoBox";
import ProjectFormBox from "../components/Projects/projectsFormBox";
import NavBar from "../components/NavBar/NavBar";
import "./homePage.css";


export default function HomePage() {
  return (
    <div>
      <NavBar />
  
      <div className="biography-home-container">
        <BiographyForm />
      </div>
      <div className="contac-home-container">
      <ContactInfoBox />
      </div>
      <div className="project-home-container">
        <ProjectFormBox/>
      </div>

      <footer>
        <p>© 2025 Edward_Nasser_Portfolio</p>
      </footer>
    </div>
  );
}
