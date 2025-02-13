package com.example.portfoliobe.Projectssubdomain.presentationlayer;

import com.example.portfoliobe.Projectssubdomain.datalayer.ProjectIdentifier;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectsRequestModel {


    private String projectId;
    private String name;
    private String description;
    private String technologies;
    private String startDate;
    private String endDate;
    private String projectShowcase;
    private String projectRepository;


}
