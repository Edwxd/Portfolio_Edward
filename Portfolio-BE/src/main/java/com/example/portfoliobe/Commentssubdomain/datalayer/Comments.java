package com.example.portfoliobe.Commentssubdomain.datalayer;


import jakarta.persistence.Embedded;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "comments")
public class Comments {

    @Id
    private String id;

    @Embedded
    private CommentIdentifier commentId;
    private String name;
    private String email;
    private String comment;





}
