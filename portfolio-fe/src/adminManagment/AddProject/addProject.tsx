import { ChangeEvent, FormEvent, JSX, useState } from "react";
import { projectRequestModel } from "../../Models/Projects/projectsRequestModel";
import { addProject } from "../../api/Projects/createProject";
import "./addProject.css";

interface AddProjectProps {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddProject({ setIsAdding }: AddProjectProps): JSX.Element {
  const [formData, setFormData] = useState<projectRequestModel>({
    id: "",
    name: "",
    description: "",
    technologies: "",
    startDate: "",
    endDate: "",
    projectRepository: "",
    projectShowcase: ""
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChanges = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await addProject(formData);
      alert("Project added successfully");
      setIsAdding(false);
      window.location.reload();
    } catch (err) {
      console.error("Error adding project:", err);
      setError("Failed to add project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validate = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (!formData.name) errors.name = "Project name is required";
    if (!formData.description) errors.description = "Description is required";
    if (!formData.technologies) errors.technologies = "Technologies are required";
    if (!formData.startDate) errors.startDate = "Start date is required";
    if (!formData.endDate) errors.endDate = "End date is required";
    if (!formData.projectRepository) errors.projectRepository = "Repository URL is required";

    if (Object.keys(errors).length > 0) {
      setError("Please fix the errors above.");
      return false;
    }
    setError(null);
    return true;
  };

  return (
    <div className="edit-form-overlay">
      <div className="edit-form-container">
        <form onSubmit={handleSubmit} className="edit-form">
          <h2 className="edit-form-heading">Add New Project</h2>

          {/* Project Name */}
          <div className="input-container">
            <label htmlFor="name">Project Name:</label>
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
              style={{ height: "200px" }}
            />
          </div>

          {/* Technologies */}
          <div className="input-container">
            <label htmlFor="technologies">Technologies:</label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChanges}
              className="edit-form-input"
              id="technologies"
            />
          </div>

          {/* Start and End Date */}
          <div className="date-container">
            <div className="input-container">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="text"
                name="startDate"
                value={formData.startDate}
                onChange={handleChanges}
                className="edit-form-input"
                id="startDate"
              />
            </div>

            <div className="input-container">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="text"
                name="endDate"
                value={formData.endDate}
                onChange={handleChanges}
                className="edit-form-input"
                id="endDate"
              />
            </div>
          </div>

          {/* Project Repository */}
          <div className="input-container">
            <label htmlFor="projectRepository">Project Repository:</label>
            <input
              type="text"
              name="projectRepository"
              value={formData.projectRepository}
              onChange={handleChanges}
              className="edit-form-input"
              id="projectRepository"
            />
          </div>

          {/* Buttons */}
          <div className="button-container">
            <button
              className="submit-update-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Project"}
            </button>
            <button
              className="cancel-update-button"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}
