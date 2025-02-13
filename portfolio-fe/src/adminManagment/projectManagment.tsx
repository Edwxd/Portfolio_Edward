import React, { useEffect, useState } from "react";
import "./projectManagment.css";
import { fetchProjects } from "../api/Projects/getProjects";
import { projectRequestModel } from "../Models/Projects/projectsRequestModel";
import EditProject from "./UpdateProject/updateProject";
import AddProject from "./AddProject/addProject";

export default function ProjectPage() {
  const [projects, setProjects] = useState<projectRequestModel[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<projectRequestModel | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        if (data) {
          setProjects(data);
          console.log("Projects data:", data);
        }
      } catch (err) {
        console.error("Error fetching Projects:", err);
        setError("Failed to fetch the Projects");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleEditClick = (project: projectRequestModel) => {
    console.log("Editing project:", project);
    setEditingProject(project);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!projects || projects.length === 0) return <p>No project data available.</p>;

  return (
    <div className="project-container">
      <h1>Manage Projects</h1>
      <div className="add-project">
        <button onClick={() => setIsAdding(true)}>Add Project</button>
      </div>

      {projects.map((project, index) => (
        <div key={index} className="project-box">
          <h2>{project.name}</h2>
          <div className="project-description">
            <h3>Description:</h3>
            <p>{project.description}</p>
            <div className="divider"></div>

            <h3>Technologies:</h3>
            <p>{project.technologies}</p>
            <div className="divider"></div>

            <h3>Start date:</h3>
            <p>{project.startDate}</p>
            <h3>End date:</h3>
            <p>{project.endDate}</p>
          </div>

          {index !== projects.length - 1 && <div className="divider"></div>}
          <div className="project-buttons">
            <div className="project-edit">
              <button onClick={() => handleEditClick(project)}>Edit</button>
            </div>
            <div className="project-delete">
              <button>Delete</button>
            </div>
          </div>
        </div>
      ))}

      {/* 🟢 Move this outside the map but inside the container */}
      {editingProject && (
        <div className="edit-popup">
          <EditProject project={editingProject} setIsEditing={setEditingProject} />
        </div>
      )}
    {isAdding && <AddProject setIsAdding={setIsAdding} />}

      
    </div>
  );
}
