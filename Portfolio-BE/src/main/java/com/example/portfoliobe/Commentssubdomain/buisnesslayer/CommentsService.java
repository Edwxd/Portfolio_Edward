package com.example.portfoliobe.Commentssubdomain.buisnesslayer;

import com.example.portfoliobe.Commentssubdomain.presentation.CommentsResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface CommentsService {


    Flux<CommentsResponseModel> getAllComments();

    Mono<CommentsResponseModel> getCommentById(String id);

    Mono<CommentsResponseModel> createComment(CommentsResponseModel comment);
}
