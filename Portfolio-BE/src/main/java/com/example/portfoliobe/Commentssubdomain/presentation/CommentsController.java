package com.example.portfoliobe.Commentssubdomain.presentation;

import com.example.portfoliobe.Commentssubdomain.buisnesslayer.CommentsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/v1/comments")
//@CrossOrigin(origins = "https://portfolioedward-production.up.railway.app")
//@CrossOrigin(origins = "http://localhost:3000")
public class CommentsController {


    private final CommentsService commentsService;


    public CommentsController(CommentsService commentsService) {
        this.commentsService = commentsService;
    }


    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Flux<CommentsResponseModel> getAllComments() {
        return commentsService.getAllComments();
    }

    @GetMapping(value = "/{commentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<CommentsResponseModel>> getCommentById(@PathVariable String commentId) {
        return Mono.just(commentId)
                .filter(id -> id.length() == 36)
                .flatMap(commentsService::getCommentByCommentId)
                .map(ResponseEntity::ok);
    }


    @PostMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<CommentsResponseModel>> createComment(@RequestBody CommentsRequestModel comment) {
        return commentsService.createComment(Mono.just(comment))
                .map(commentsResponseModel -> ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(commentsResponseModel))
                .onErrorResume(e -> Mono.just(
                        ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(null)));
    }


    @PutMapping(value = "/{commentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<CommentsResponseModel>> acceptComment(@PathVariable String commentId) {
        return commentsService.acceptComment(commentId)
                .then(Mono.just(ResponseEntity.ok().build()));
    }


    @PutMapping(value = "/rejectComment/{commentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<CommentsResponseModel>> rejectComment(@PathVariable String commentId) {
        return commentsService.rejectComment(commentId)
                .then(Mono.just(ResponseEntity.ok().build()));
    }


}
