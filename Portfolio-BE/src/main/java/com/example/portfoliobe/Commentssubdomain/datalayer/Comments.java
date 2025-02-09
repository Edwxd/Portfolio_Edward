package com.example.portfoliobe.Commentssubdomain.datalayer;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "comments")
public class Comments {

    private String commentId;
    private String name;
    private String email;
    private String comment;





}
