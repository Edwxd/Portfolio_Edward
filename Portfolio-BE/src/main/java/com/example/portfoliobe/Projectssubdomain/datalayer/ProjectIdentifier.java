package com.example.portfoliobe.Projectssubdomain.datalayer;

import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.util.UUID;

@Embeddable
@Getter
public class ProjectIdentifier {

    private String projectId;



    public ProjectIdentifier(String projectIdentifier) {
        this.projectId = projectIdentifier;
    }

    public ProjectIdentifier() {
        this.projectId = UUID.randomUUID().toString();
    }

}
