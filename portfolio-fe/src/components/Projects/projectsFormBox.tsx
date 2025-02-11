import React, { useEffect, useState } from "react";
import { fetchProjects } from "../../api/Projects/getProjects";
import { projectRequestModel } from "../../Models/Projects/projectsRequestModel";
import "./ProjectFormBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";


export default function ProjectPage() {
  const [projects, setProjects] = useState<projectRequestModel[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [animationClass, setAnimationClass] = useState<string>("slide-active");


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

  

  

  const changeProject = (index: number, direction: "left" | "right") => {
    // Set exit animation
    setAnimationClass(direction === "left" ? "slide-left" : "slide-right");

    setTimeout(() => {
      setCurrentIndex(index);
      setAnimationClass("slide-active"); // Reset for next project
    }, 400); // Match CSS transition duration
  };

  const nextProject = () => {
    if (projects) {
      changeProject((currentIndex + 1) % projects.length, "left");
    }
  };

  const prevProject = () => {
    if (projects) {
      changeProject((currentIndex - 1 + projects.length) % projects.length, "right");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!projects || projects.length === 0) return <p>No project data available.</p>;

  return (
    <div className="project-container">
      <button className="slider-button slider-button-left" onClick={prevProject}>‹</button>
      <h1>My Projects</h1>
      <div className="divider"></div>
      <div className={`project-text-container ${animationClass}`}>
      <strong>Project Name:</strong>
      <p>{projects[currentIndex].name}</p>
        <div className="divider"></div>
        <strong>Description:</strong> 
        <p>{projects[currentIndex].description}</p>
        <div className="divider"></div>
        <strong>Technologies Used:</strong>
        <p> {projects[currentIndex].technologies}</p>
        <div className="divider"></div>
        <p><strong>Start Date:</strong> {projects[currentIndex].startDate}</p>
        <p><strong>End Date:</strong> {projects[currentIndex].endDate}</p>
        <div className="divider"></div>
        <div className="social-links">
        <a href={projects[currentIndex].projectRepository} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} className="social-icon" />
        </a>
        </div>
      </div>

      <button className="slider-button slider-button-right" onClick={nextProject}>›</button>
    </div>
  );
}
