package com.example.portfoliobe.Projectssubdomain.buisnesslayer;

import com.example.portfoliobe.Projectssubdomain.datalayer.Projects;
import com.example.portfoliobe.Projectssubdomain.presentationlayer.ProjectsRequestModel;
import com.example.portfoliobe.Projectssubdomain.presentationlayer.ProjectsResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ProjectsService {

    Flux<ProjectsResponseModel> getAllProjects();

    Mono<ProjectsResponseModel> getProjectById(String id);

    Mono<ProjectsResponseModel> createProject(Mono<ProjectsRequestModel> project);
}
