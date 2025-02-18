package com.example.portfoliobe.Projectssubdomain.presentationlayer;

import com.example.portfoliobe.Projectssubdomain.buisnesslayer.ProjectsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/v1/projects")
@CrossOrigin(origins = "https://portfolioedward-production.up.railway.app")

//@CrossOrigin(origins = "http://localhost:3000")
public class ProjectsController {

    private final ProjectsService projectsService;

    public ProjectsController(ProjectsService projectsService) {
        this.projectsService = projectsService;
    }


    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Flux<ProjectsResponseModel> getAllProjects() {
        return projectsService.getAllProjects();
    }

    @GetMapping(value = "/{projectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ProjectsResponseModel> getProjectById(@PathVariable String projectId) {
        return projectsService.getProjectByProjectId(projectId);
    }


    @PostMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<ProjectsResponseModel>> createNewProject(@RequestBody ProjectsRequestModel project) {
        return projectsService.createProject(Mono.just(project))
                .map(ProjectsResponseModel -> ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(ProjectsResponseModel))
                .onErrorResume(e -> Mono.just(
                        ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(null)));
    }

    @PutMapping(value = "/{projectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<ProjectsResponseModel>> updateProject(@PathVariable String projectId, @RequestBody ProjectsRequestModel project) {
        return projectsService.updateProject(projectId, Mono.just(project))
                .map(ProjectsResponseModel -> ResponseEntity
                        .status(HttpStatus.OK)
                        .body(ProjectsResponseModel))
                .onErrorResume(e -> Mono.just(
                        ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(null)));
    }

    @DeleteMapping(value = "/{projectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<Void>> deleteProject(@PathVariable String projectId) {
        return projectsService.deleteProject(projectId)
                .then(Mono.just(ResponseEntity.ok().build()));
    }
}
