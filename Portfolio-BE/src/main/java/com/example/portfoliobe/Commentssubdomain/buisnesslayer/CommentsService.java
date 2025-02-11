package com.example.portfoliobe.Commentssubdomain.buisnesslayer;

import com.example.portfoliobe.Commentssubdomain.presentation.CommentsRequestModel;
import com.example.portfoliobe.Commentssubdomain.presentation.CommentsResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface CommentsService {


    Flux<CommentsResponseModel> getAllComments();

    Mono<CommentsResponseModel> getCommentByCommentId(String CommentId);

    Mono<CommentsResponseModel> createComment(Mono<CommentsRequestModel> commentsRequestModelMono);

    Mono<Void> acceptComment(String commentId);

}
