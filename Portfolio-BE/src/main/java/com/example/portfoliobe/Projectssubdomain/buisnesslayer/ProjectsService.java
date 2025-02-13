package com.example.portfoliobe.Projectssubdomain.buisnesslayer;

import com.example.portfoliobe.Projectssubdomain.datalayer.Projects;
import com.example.portfoliobe.Projectssubdomain.presentationlayer.ProjectsRequestModel;
import com.example.portfoliobe.Projectssubdomain.presentationlayer.ProjectsResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ProjectsService {

    Flux<ProjectsResponseModel> getAllProjects();

    Mono<ProjectsResponseModel> getProjectByProjectId(String projectId);

    Mono<ProjectsResponseModel> createProject(Mono<ProjectsRequestModel> project);

    Mono<ProjectsResponseModel> updateProject(String projectId, Mono<ProjectsRequestModel> project);

    Mono<Void> deleteProject(String projectId);
}
