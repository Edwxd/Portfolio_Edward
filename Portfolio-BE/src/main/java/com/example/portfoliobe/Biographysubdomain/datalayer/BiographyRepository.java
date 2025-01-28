package com.example.portfoliobe.Biographysubdomain.datalayer;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface BiographyRepository extends ReactiveMongoRepository<Biography, String> {

Mono<Biography>findBiographiesByStudentName(String myName);


}
