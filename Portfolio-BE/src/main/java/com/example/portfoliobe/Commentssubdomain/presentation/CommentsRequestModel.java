package com.example.portfoliobe.Commentssubdomain.presentation;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentsRequestModel {


    private String name;
    private String email;
    private String comment;

}
