import React, { useEffect, useState } from "react";
import { fetchProjects } from "../../api/Projects/getProjects";
import { projectRequestModel } from "../../Models/Projects/projectsRequestModel";
import "./projectFormBox.css";

export default function ProjectPage() {
  const [projects, setProjects] = useState<projectRequestModel[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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

  const nextProject = () => {
    if (projects) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }
  };

  const prevProject = () => {
    if (projects) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!projects || projects.length === 0) return <p>No project data available.</p>;

  return (
    <div className="project-container">
      <button className="slider-button slider-button-left" onClick={prevProject}>‹</button>

      <h1>{projects[currentIndex].name}</h1>

      <div className="project-text-container">
        <div className="divider"></div>
        <p>{projects[currentIndex].description}</p>
        <p><strong>Technologies:</strong> {projects[currentIndex].technologies}</p>
        <div className="divider"></div>
        <p><strong>Start:</strong> {projects[currentIndex].startDate}</p>
        <p><strong>End:</strong> {projects[currentIndex].endDate}</p>
        <div className="divider"></div>
      </div>

      <button className="slider-button slider-button-right" onClick={nextProject}>›</button>
    </div>
  );
}
