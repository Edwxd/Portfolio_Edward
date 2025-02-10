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

    private ProjectIdentifier projectId;
    private String name;
    private String description;
    private String technologies;


}
