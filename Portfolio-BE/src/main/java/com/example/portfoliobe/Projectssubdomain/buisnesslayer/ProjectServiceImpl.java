package com.example.portfoliobe.Projectssubdomain.buisnesslayer;

import com.example.portfoliobe.Projectssubdomain.datalayer.Projects;
import com.example.portfoliobe.Projectssubdomain.datalayer.ProjectsRepository;
import com.example.portfoliobe.Projectssubdomain.presentationlayer.ProjectsRequestModel;
import com.example.portfoliobe.Projectssubdomain.presentationlayer.ProjectsResponseModel;
import com.example.portfoliobe.utils.EntityModelUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@Service
public class ProjectServiceImpl implements ProjectsService{

    @Autowired
    private ProjectsRepository projectsRepository;
    @Override
    public Flux<ProjectsResponseModel> getAllProjects() {
        return projectsRepository.findAll().map(EntityModelUtils::toProjectsResponseModel);
    }

    @Override
    public Mono<ProjectsResponseModel> getProjectByProjectId(String projectId) {
        return projectsRepository.findProjectsByProjectIdentifier_ProjectId(projectId).map(EntityModelUtils::toProjectsResponseModel);
    }

    @Override
    public Mono<ProjectsResponseModel> createProject(Mono<ProjectsRequestModel> projectsRequestModelMono) {
        return projectsRequestModelMono
                .filter(projects -> projects.getName() != null && !projects.getName().isEmpty())
                .map(EntityModelUtils::toProjectsEntity)
                .flatMap(projectsRepository::save)
                .map(EntityModelUtils::toProjectsResponseModel);
    }

    @Override
    public Mono<ProjectsResponseModel> updateProject(String projectId, Mono<ProjectsRequestModel> projectsRequestModelMono) {
        return projectsRepository.findProjectsByProjectIdentifier_ProjectId(projectId)
                .flatMap(foundProject -> projectsRequestModelMono
                        .map(EntityModelUtils::toProjectsEntity)
                        .doOnNext(updatedProject -> updatedProject.setId(foundProject.getId()))
                        .flatMap(projectsRepository::save)
                        .map(EntityModelUtils::toProjectsResponseModel));
    }
}
