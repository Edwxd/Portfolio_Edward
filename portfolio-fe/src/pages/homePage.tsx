import BiographyForm from "../components/BiographyForm/biographyFormBox";
import ContactInfoBox from "../components/ContactInfo/contactInfoBox";
import ProjectFormBox from "../components/Projects/projectsFormBox";
import { AcceptedComment } from "../components/AcceptedComment/acceptedComment";
import NavBar from "../components/NavBar/NavBar";
import "./homePage.css";

export default function HomePage() {
  return (
    <div>
      <NavBar />
  
      <div className="biography-contact-home-container">
        <BiographyForm />
        <ContactInfoBox />
      </div>

      {/* New container for Projects */}
      <div className="projects-home-container">
        <ProjectFormBox />
      </div>

      <div className="comments-managment-container">
        <AcceptedComment />
      </div>
      
      <footer>
        <p>© 2025 Edward_Nasser_Portfolio</p>
      </footer>
    </div>
  );
}
