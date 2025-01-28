package com.example.portfoliobe.Biographysubdomain.presentationlayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BiographyResponseModel {

    private String name;
    private String description;
    private String imageUrl;
    private String githubUrl;
    private String linkedinUrl;
    private String email;
    private String phoneNumber;
    private String address;
    private String resumeUrl;
}
