package com.example.portfoliobe.Commentssubdomain.buisnesslayer;

import com.example.portfoliobe.Commentssubdomain.datalayer.CommentStatus;
import com.example.portfoliobe.Commentssubdomain.datalayer.CommentsRepository;
import com.example.portfoliobe.Commentssubdomain.presentation.CommentsRequestModel;
import com.example.portfoliobe.Commentssubdomain.presentation.CommentsResponseModel;
import com.example.portfoliobe.utils.EntityModelUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@Service
public class CommentsServiceImpl implements CommentsService{

    @Autowired
    private CommentsRepository commentsRepository;

    @Override
    public Flux<CommentsResponseModel> getAllComments() {
        return commentsRepository.findAll()
                .map(EntityModelUtils::toCommentsResponseModel);
    }

    @Override
    public Mono<CommentsResponseModel> getCommentByCommentId(String commentId) {
        return commentsRepository.getCommentsByCommentIdentifier_CommentId(commentId)
                .map(EntityModelUtils::toCommentsResponseModel);
    }

    @Override
    public Mono<CommentsResponseModel> createComment(Mono<CommentsRequestModel> commentsRequestModelMono) {
        return commentsRequestModelMono
                .filter(comments -> comments.getComment() != null && !comments.getComment().isEmpty())
                .map(EntityModelUtils::toCommentsEntity)
                .map(comment -> {
                    comment.setCommentStatus(CommentStatus.COMMENT_REVIEW);
                    return comment;
                })
                .flatMap(commentsRepository::save)
                .map(EntityModelUtils::toCommentsResponseModel);

    }

    @Override
    public Mono<Void> acceptComment(String commentId) {
        return commentsRepository.getCommentsByCommentIdentifier_CommentId(commentId)
                .map(comments -> {
                    comments.setCommentStatus(CommentStatus.COMMENT_APPROVED);
                    return comments;
                })
                .flatMap(commentsRepository::save)
                .then();
    }

    @Override
    public Mono<Void> rejectComment(String commentId) {
        return commentsRepository.getCommentsByCommentIdentifier_CommentId(commentId)
                .map(comments -> {
                    comments.setCommentStatus(CommentStatus.COMMENT_REJECTED);
                    return comments;
                })
                .flatMap(commentsRepository::save)
                .then();
    }


    @Override
    public Mono<Void> deleteComment(String commentId) {
        return commentsRepository.getCommentsByCommentIdentifier_CommentId(commentId)
                .flatMap(commentsRepository::delete)
                .then();
    }




}
