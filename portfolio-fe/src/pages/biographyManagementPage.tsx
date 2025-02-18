import NavBar from "../components/NavBar/NavBar";
import "./homePage.css";
import BiographyEditPage from "../adminManagment/Biography/biographyEditPage";

export default function BiographyEditForm() {
  return (
    <div>
      <NavBar />
      
      <div className="biography-managment-container">
        <BiographyEditPage/>
      </div>
  
      
      <footer>
        <p>© 2025 Edward_Nasser_Portfolio</p>
      </footer>
    </div>
  );
}
