import React, { useEffect, useState } from "react";
import { fetchProjects } from "../../api/Projects/getProjects";
import { projectRequestModel } from "../../Models/Projects/projectsRequestModel";
import "./ProjectFormBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (loading) return <div className="loading-state">Loading projects...</div>;
  if (error) return <div className="error-state">{error}</div>;
  if (!projects || projects.length === 0) return <div className="error-state">No project data available.</div>;

  return (
    <div className="projects-page">
      <div className="project-container">
        <h1 className="project-title">My Projects</h1>
        <div className="project-counter">{currentIndex + 1} / {projects.length}</div>
        
        <div className="divider"></div>
        
        <div className={`project-content ${animationClass}`}>
          <div className="project-header">
            <h2>{projects[currentIndex].name}</h2>
          </div>
          
          <div className="project-info">
            <div className="info-item">
              <div className="info-label">Description</div>
              <div className="info-value">{projects[currentIndex].description}</div>
            </div>
            
            <div className="divider small"></div>
            
            <div className="info-item">
              <div className="info-label">Technologies Used</div>
              <div className="info-value tech-tags">
                {projects[currentIndex].technologies.split(',').map((tech, index) => (
                  <span key={index} className="tech-tag">{tech.trim()}</span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="divider"></div>
          
          <div className="project-showcase">
            <h3>Project Showcase</h3>
            <div className="video-container">
              <video key={projects[currentIndex].projectShowcase} controls>
                <source src={projects[currentIndex].projectShowcase} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          <div className="divider"></div>
          
          <div className="project-timeline">
            <div className="timeline-item">
              <span className="timeline-label">Started:</span>
              <span className="timeline-date">{projects[currentIndex].startDate}</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-label">Completed:</span>
              <span className="timeline-date">{projects[currentIndex].endDate}</span>
            </div>
          </div>
          
          <div className="divider"></div>
          
          <div className="project-links">
            <a 
              href={projects[currentIndex].projectRepository} 
              target="_blank" 
              rel="noopener noreferrer"
              className="repo-link"
            >
              <div className="link-button">
                <FontAwesomeIcon icon={faGithub} className="link-icon" />
                <span>View Repository</span>
              </div>
            </a>
          </div>
        </div>
        
        <button className="nav-button prev-button" onClick={prevProject} aria-label="Previous project">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        
        <button className="nav-button next-button" onClick={nextProject} aria-label="Next project">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}