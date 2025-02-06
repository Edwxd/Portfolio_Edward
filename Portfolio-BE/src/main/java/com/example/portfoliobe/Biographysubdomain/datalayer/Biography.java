package com.example.portfoliobe.Biographysubdomain.datalayer;




import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Document(collection = "biographies")
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



}
