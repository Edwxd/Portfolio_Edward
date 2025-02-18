import NavBar from "../components/NavBar/NavBar";
import "./homePage.css";
import EditContactInfo from "../adminManagment/ContactInformation/EditContactInfo";

export default function ContactInfoEditPage() {
  return (
    <div>
      <NavBar />
      
      <div className="biography-managment-container">
        <EditContactInfo/>
      </div>
  
      
      <footer>
        <p>© 2025 Edward_Nasser_Portfolio</p>
      </footer>
    </div>
  );
}
