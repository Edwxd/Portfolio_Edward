package com.example.portfoliobe.Projectssubdomain.datalayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Projects {

    @Id
    private String id;

    private ProjectIdentifier projectIdentifier;
    private String name;
    private String description;
    private String technologies;
    private String startDate;
    private String endDate;
    private String projectShowcase;


}
