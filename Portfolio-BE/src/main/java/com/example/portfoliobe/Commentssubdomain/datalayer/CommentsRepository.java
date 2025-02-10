package com.example.portfoliobe.Commentssubdomain.datalayer;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface CommentsRepository extends ReactiveMongoRepository<Comments, String> {

    Mono<Comments> getCommentsByCommentIdentifier_CommentId(String commentIdentifier);
}
