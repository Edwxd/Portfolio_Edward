import { ChangeEvent, FormEvent, JSX, useState } from "react";
import { biographyRequestModel } from "../../../Models/Biography/biographyRequestModel";
import { editBiography } from "../../../api/Biography/updateBiography";
import "./EditBiography.css";

interface EditBiographyProps {
    biography: biographyRequestModel;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    setBiography: React.Dispatch<React.SetStateAction<biographyRequestModel | null>>; // Pass the setBiography function
  }
  

export default function EditBiography({ biography, setIsEditing, setBiography }: EditBiographyProps): JSX.Element {
  const [formData, setFormData] = useState<biographyRequestModel>(biography);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChanges = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setIsEditing(false); // Close the edit form without saving
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      await editBiography(biography.bioIdentifier, formData); // Send the update request
      alert("Biography updated successfully");
  
      setIsEditing(false); // Close the edit form
      setBiography(formData); // Update the biography state in the parent component
    } catch (err) {
      console.error("Error updating biography:", err);
      setError("Failed to update biography. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  const validate = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.description) errors.description = "Description is required";
    if (!formData.imageUrl) errors.imageUrl = "Profile image URL is required";

    if (Object.keys(errors).length > 0) {
      setError("Please fix the errors above.");
      return false;
    }
    setError(null);
    return true;
  };

  return (
    <div className="edit-form-container">
      <form onSubmit={handleSubmit} className="edit-form">
        <h2 className="edit-form-heading">Edit Biography</h2>

        {/* Name */}
        <div className="input-container">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChanges}
            className="edit-form-input"
            id="name"
          />
        </div>

        {/* Description */}
        <div className="input-container">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChanges}
            className="edit-form-textarea"
            id="description"
            style={{ height: "150px" }}
          />
        </div>

        {/* Buttons */}
        <div className="button-container">
          <button className="submit-update-button" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Biography"}
          </button>
          <button className="cancel-update-button" type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
