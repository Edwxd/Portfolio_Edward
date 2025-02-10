package com.example.portfoliobe.Projectssubdomain.datalayer;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface ProjectsRepository extends ReactiveMongoRepository<Projects, String> {

    Mono<Projects> getProjectById(String id);
}
