package com.example.portfoliobe.Commentssubdomain.datalayer;


import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.util.UUID;

@Embeddable
@Getter
public class CommentIdentifier {

    private String commentId;

    public CommentIdentifier(String commentId) {
        this.commentId = commentId;
    }


    public CommentIdentifier() {
        this.commentId = UUID.randomUUID().toString();
    }
}
