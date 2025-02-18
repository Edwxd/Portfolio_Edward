import { ChangeEvent, FormEvent, JSX, useState } from "react";
import { biographyRequestModel } from "../../../Models/Biography/biographyRequestModel";
import { editBiography } from "../../../api/Biography/updateBiography";
import "./EditContactInfo.css";

interface EditContactInfoProps {
  biography: biographyRequestModel;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setBiography: React.Dispatch<React.SetStateAction<biographyRequestModel | null>>; // Pass the setBiography function
}

export default function EditContactInfo({ biography, setIsEditing, setBiography }: EditContactInfoProps): JSX.Element {
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
    if (!formData.email) errors.email = "Email is required";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.linkedinUrl) errors.linkedinUrl = "LinkedIn URL is required";
    if (!formData.githubUrl) errors.githubUrl = "GitHub URL is required";

    if (Object.keys(errors).length > 0) {
      setError("Please fix the errors above.");
      return false;
    }
    setError(null);
    return true;
  };

  return (
    <div className="edit-contact-info-form-container">
      <form onSubmit={handleSubmit} className="contact-info-form">
        <h2 className="contact-info-form-heading" style={{color: "black"}}>Edit Contact Info</h2>

        {/* Email */}
        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChanges}
            className="contact-info-input"
            id="email"
            placeholder="Enter your email"
          />
        </div>

        {/* Address */}
        <div className="input-container">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChanges}
            className="contact-info-input"
            id="address"
            placeholder="Enter your address"
          />
        </div>

        {/* Social Media Links */}
        <div className="input-container">
          <label htmlFor="linkedinUrl">LinkedIn URL:</label>
          <input
            type="text"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleChanges}
            className="contact-info-input"
            id="linkedinUrl"
            placeholder="Enter LinkedIn URL"
          />

          <label htmlFor="githubUrl">GitHub URL:</label>
          <input
            type="text"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChanges}
            className="contact-info-input"
            id="githubUrl"
            placeholder="Enter GitHub URL"
          />
        </div>

        {/* Buttons */}
        <div className="button-container">
          <button className="submit-update-button" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Contact Info"}
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
