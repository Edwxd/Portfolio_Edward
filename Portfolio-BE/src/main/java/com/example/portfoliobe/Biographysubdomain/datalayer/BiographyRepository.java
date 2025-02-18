package com.example.portfoliobe.Biographysubdomain.datalayer;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


public interface BiographyRepository extends ReactiveMongoRepository<Biography, String> {


Mono<Biography> getBiographyByBiographyIdentifier_BiographyId(String bioId);


}
