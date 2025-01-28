package com.example.portfoliobe.Biographysubdomain.datalayer;


import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Biography {

    @Id
    private String id;

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
